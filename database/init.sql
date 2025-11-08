-- ReqApp Database Initialization
-- PostgreSQL 15+ Database Schema

-- Extensions aktivieren
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    role VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    is_active BOOLEAN DEFAULT true,
    github_token TEXT, -- encrypted
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_by UUID REFERENCES users(id)
);

-- USER SETTINGS TABLE
CREATE TABLE IF NOT EXISTS user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE REFERENCES users(id) ON DELETE CASCADE,
    language VARCHAR(10) DEFAULT 'de',
    theme VARCHAR(20) DEFAULT 'auto' CHECK (theme IN ('light', 'dark', 'auto')),
    notifications_enabled BOOLEAN DEFAULT true,
    default_llm_config_id UUID,
    timezone VARCHAR(50) DEFAULT 'Europe/Zurich',
    date_format VARCHAR(20) DEFAULT 'DD.MM.YYYY',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    title VARCHAR(255) NOT NULL,
    short_name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('product', 'project', 'kleinmassnahme')),
    description TEXT,
    github_repo_url VARCHAR(500),
    github_repo_name VARCHAR(255),
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'archived', 'draft')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- PROJECT TAGS TABLE
CREATE TABLE IF NOT EXISTS project_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LLM CONFIGURATIONS TABLE
CREATE TABLE IF NOT EXISTS llm_configurations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    provider_name VARCHAR(50) NOT NULL,
    api_key TEXT NOT NULL, -- encrypted
    model_name VARCHAR(100) NOT NULL,
    display_name VARCHAR(100),
    is_active BOOLEAN DEFAULT true,
    is_default BOOLEAN DEFAULT false,
    max_tokens INTEGER DEFAULT 4000,
    temperature DECIMAL(2,1) DEFAULT 0.7,
    settings JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CHAT SESSIONS TABLE
CREATE TABLE IF NOT EXISTS chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255),
    llm_config_id UUID REFERENCES llm_configurations(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CHAT MESSAGES TABLE
CREATE TABLE IF NOT EXISTS chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    token_count INTEGER,
    context_files JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL CHECK (category IN ('product', 'project', 'kleinmassnahme')),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    prompt_template TEXT NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- DOCUMENT TEMPLATES TABLE
CREATE TABLE IF NOT EXISTS document_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL CHECK (category IN ('product', 'project', 'kleinmassnahme')),
    name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SYSTEM SETTINGS TABLE
CREATE TABLE IF NOT EXISTS system_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    key VARCHAR(100) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    data_type VARCHAR(20) NOT NULL CHECK (data_type IN ('string', 'integer', 'boolean', 'json')),
    description TEXT,
    category VARCHAR(50),
    is_public BOOLEAN DEFAULT false,
    updated_by UUID REFERENCES users(id),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LLM USAGE LOGS TABLE
CREATE TABLE IF NOT EXISTS llm_usage_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    project_id UUID REFERENCES projects(id) ON DELETE SET NULL,
    session_id UUID REFERENCES chat_sessions(id) ON DELETE SET NULL,
    message_id UUID REFERENCES chat_messages(id) ON DELETE SET NULL,
    llm_config_id UUID REFERENCES llm_configurations(id),
    provider_name VARCHAR(50),
    model_name VARCHAR(100),
    prompt_tokens INTEGER,
    completion_tokens INTEGER,
    total_tokens INTEGER,
    estimated_cost DECIMAL(10,6),
    response_time_ms INTEGER,
    status VARCHAR(20) CHECK (status IN ('success', 'error', 'timeout')),
    error_message TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- COST TRACKING TABLE (Aggregated)
CREATE TABLE IF NOT EXISTS cost_tracking (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    provider_name VARCHAR(50),
    total_tokens BIGINT,
    total_cost DECIMAL(10,2),
    request_count INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, period_start, period_end, provider_name)
);

-- AUDIT LOGS TABLE
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE SET NULL,
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50),
    entity_id UUID,
    details JSONB,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES für bessere Performance
CREATE INDEX IF NOT EXISTS idx_projects_user_id ON projects(user_id);
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);
CREATE INDEX IF NOT EXISTS idx_projects_status ON projects(status);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_project_id ON chat_sessions(project_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_created_at ON chat_sessions(created_at);

CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_role ON chat_messages(role);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

CREATE INDEX IF NOT EXISTS idx_llm_configurations_user_id ON llm_configurations(user_id);
CREATE INDEX IF NOT EXISTS idx_llm_configurations_provider ON llm_configurations(provider_name);
CREATE INDEX IF NOT EXISTS idx_llm_configurations_active ON llm_configurations(is_active);

CREATE INDEX IF NOT EXISTS idx_llm_usage_logs_user_id ON llm_usage_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_llm_usage_logs_created_at ON llm_usage_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_llm_usage_logs_provider ON llm_usage_logs(provider_name);
CREATE INDEX IF NOT EXISTS idx_llm_usage_logs_status ON llm_usage_logs(status);

CREATE INDEX IF NOT EXISTS idx_cost_tracking_user_id ON cost_tracking(user_id);
CREATE INDEX IF NOT EXISTS idx_cost_tracking_period ON cost_tracking(period_start, period_end);
CREATE INDEX IF NOT EXISTS idx_cost_tracking_provider ON cost_tracking(provider_name);

CREATE INDEX IF NOT EXISTS idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created_at ON audit_logs(created_at);
CREATE INDEX IF NOT EXISTS idx_audit_logs_action ON audit_logs(action);

CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);
CREATE INDEX IF NOT EXISTS idx_users_active ON users(is_active);

-- Trigger für updated_at Timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger für alle Tabellen mit updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_settings_updated_at BEFORE UPDATE ON user_settings
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_llm_configurations_updated_at BEFORE UPDATE ON llm_configurations
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_chat_sessions_updated_at BEFORE UPDATE ON chat_sessions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cost_tracking_updated_at BEFORE UPDATE ON cost_tracking
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Initiale System-Einstellungen
INSERT INTO system_settings (key, value, data_type, description, category, is_public) VALUES
('max_projects_per_user', '50', 'integer', 'Maximale Anzahl Projekte pro Benutzer', 'limits', false),
('max_llm_configs_per_user', '10', 'integer', 'Maximale Anzahl LLM-Konfigurationen pro Benutzer', 'limits', false),
('default_token_limit', '4000', 'integer', 'Standard Token-Limit für LLM-Anfragen', 'llm', true),
('session_timeout_minutes', '60', 'integer', 'Session-Timeout in Minuten', 'security', false),
('enable_self_registration', 'true', 'boolean', 'Self-Registration erlauben', 'general', true),
('max_file_upload_size_mb', '10', 'integer', 'Maximale Datei-Upload-Größe in MB', 'limits', true),
('require_email_verification', 'false', 'boolean', 'Email-Verifizierung erforderlich', 'security', false),
('password_min_length', '8', 'integer', 'Minimale Passwort-Länge', 'security', true),
('password_require_uppercase', 'true', 'boolean', 'Großbuchstaben im Passwort erforderlich', 'security', true),
('password_require_number', 'true', 'boolean', 'Zahl im Passwort erforderlich', 'security', true),
('password_require_special', 'true', 'boolean', 'Sonderzeichen im Passwort erforderlich', 'security', true)
ON CONFLICT (key) DO NOTHING;

-- Initiale Skills für die verschiedenen Kategorien
INSERT INTO skills (category, name, description, prompt_template) VALUES
('product', 'Produktvision erstellen', 'Erstellt eine umfassende Produktvision', 
'Du bist ein Produktmanagement-Experte. Erstelle eine umfassende Produktvision basierend auf folgenden Informationen:

{{USER_INPUT}}

Vorhandene Dokumente im Repository:
{{CONTEXT_FILES}}

Strukturiere die Produktvision wie folgt:
1. Executive Summary
2. Problem Statement
3. Zielgruppe
4. Produktbeschreibung
5. Unique Value Proposition
6. Erfolgskriterien
7. Roadmap (High-Level)

Verwende professionelle, präzise Sprache auf Deutsch.'),

('project', 'Projektplan erstellen', 'Erstellt einen detaillierten Projektplan',
'Du bist ein erfahrener Projektmanager. Erstelle einen detaillierten Projektplan:

{{USER_INPUT}}

Kontext aus Repository:
{{CONTEXT_FILES}}

Strukturiere den Plan wie folgt:
1. Projektübersicht
2. Ziele und Erfolgskriterien
3. Projektphasen
4. Meilensteine
5. Ressourcenplanung
6. Zeitplan
7. Risiken und Abhängigkeiten
8. Kommunikationsplan

Nutze bewährte PM-Methoden.'),

('kleinmassnahme', 'Quick-Konzept', 'Kompaktes Konzept für kleinere Maßnahmen',
'Erstelle ein kompaktes Konzept (max. 2 Seiten) für eine Kleinmaßnahme:

{{USER_INPUT}}

Kontext:
{{CONTEXT_FILES}}

Struktur:
1. Zielsetzung
2. Vorgehen
3. Aufwand (Schätzung)
4. Erwartete Ergebnisse
5. Nächste Schritte

Halte es prägnant und umsetzungsorientiert.')
ON CONFLICT DO NOTHING;

-- Erfolgsmeldung
DO $$
BEGIN
    RAISE NOTICE 'ReqApp Database erfolgreich initialisiert!';
    RAISE NOTICE 'Tabellen: %, Skills: %, System-Settings: %', 
        (SELECT COUNT(*) FROM information_schema.tables WHERE table_schema = 'public'),
        (SELECT COUNT(*) FROM skills),
        (SELECT COUNT(*) FROM system_settings);
END $$;