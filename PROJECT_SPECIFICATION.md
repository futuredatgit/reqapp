# Konzept-Erstellungs-Applikation - Projekt-Spezifikation

## Projekt-Übersicht

Eine webbasierte Anwendung zur Erstellung und Verwaltung von Konzepten und Anforderungsdokumenten mit KI-Unterstützung. Die Applikation ermöglicht es Benutzern, Projekte zu erstellen, die automatisch in privaten GitHub-Repositories angelegt werden, und mittels verschiedener LLM-APIs (OpenAI, Anthropic, etc.) Konzepte zu entwickeln.

---

## 🎯 Kern-Funktionalität

### Benutzer-Perspektive

**Standard-Benutzer (User) kann:**
- Sich registrieren und anmelden
- Eigene Projekte erstellen und verwalten
- Projekte kategorisieren (Produkt, Projekt, Kleinmaßnahme)
- GitHub-Integration für automatische Repository-Erstellung nutzen
- Chat-Interface zur Konzept-Erstellung mit LLM-Unterstützung verwenden
- Mehrere LLM-APIs konfigurieren und nutzen
- Repository-Dateien als Kontext für LLM-Anfragen verwenden
- Eigene Kosten und Token-Verbrauch einsehen
- Persönliche Einstellungen verwalten

**Administrator (Admin) kann zusätzlich:**
- Alle Benutzer verwalten (erstellen, bearbeiten, deaktivieren)
- Benutzerrollen zuweisen
- System-weite Einstellungen konfigurieren
- Gesamtkosten aller Benutzer einsehen und auswerten
- Nutzungsstatistiken analysieren
- Audit-Logs einsehen
- System-Limits festlegen

---

## 🏗️ Technologie-Stack

### Core Technologies
- **Frontend**: React 18+ mit TypeScript
- **Backend**: Node.js mit Express (oder alternativ Python FastAPI)
- **Datenbank**: PostgreSQL 15
- **Container**: Docker + Docker Compose
- **Version Control**: GitHub API v3/v4
- **Authentication**: JWT (Access + Refresh Token)

### Externe Services
- **LLM-Provider**: OpenAI, Anthropic Claude, Mistral AI (erweiterbar)
- **GitHub API**: Repository-Verwaltung, Datei-Operationen

### Entwicklungs-Tools
- **ORM**: Prisma (Node.js) oder SQLAlchemy (Python)
- **API-Client**: Axios oder Fetch API
- **State Management**: React Context API oder Zustand
- **UI-Framework**: Material-UI, Tailwind CSS oder Ant Design
- **Charts**: Recharts oder Chart.js

---

## 📁 Projekt-Struktur

```
konzept-app/
├── docker-compose.yml
├── .env.example
├── README.md
├── docs/
│   ├── API.md
│   ├── DEPLOYMENT.md
│   └── USER_GUIDE.md
├── database/
│   ├── init.sql
│   ├── migrations/
│   └── seeds/
├── backend/
│   ├── Dockerfile
│   ├── package.json (oder requirements.txt)
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js
│   │   │   ├── jwt.js
│   │   │   └── encryption.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── rbac.js
│   │   │   ├── rateLimiter.js
│   │   │   └── errorHandler.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   ├── Project.js
│   │   │   ├── ChatSession.js
│   │   │   ├── ChatMessage.js
│   │   │   ├── LLMConfiguration.js
│   │   │   ├── SystemSettings.js
│   │   │   ├── LLMUsageLog.js
│   │   │   └── AuditLog.js
│   │   ├── routes/
│   │   │   ├── auth.js
│   │   │   ├── users.js
│   │   │   ├── projects.js
│   │   │   ├── chat.js
│   │   │   ├── github.js
│   │   │   ├── llm.js
│   │   │   └── admin.js
│   │   ├── services/
│   │   │   ├── authService.js
│   │   │   ├── userService.js
│   │   │   ├── projectService.js
│   │   │   ├── githubService.js
│   │   │   ├── llmService.js
│   │   │   ├── chatService.js
│   │   │   ├── costService.js
│   │   │   ├── skillService.js
│   │   │   └── encryptionService.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── projectController.js
│   │   │   ├── chatController.js
│   │   │   └── adminController.js
│   │   ├── utils/
│   │   │   ├── logger.js
│   │   │   ├── validators.js
│   │   │   └── helpers.js
│   │   ├── scripts/
│   │   │   └── cost-aggregator.js
│   │   └── server.js
│   └── tests/
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── common/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Loading.tsx
│   │   │   │   └── ErrorBoundary.tsx
│   │   │   ├── auth/
│   │   │   │   ├── Login.tsx
│   │   │   │   ├── Register.tsx
│   │   │   │   └── ForgotPassword.tsx
│   │   │   ├── projects/
│   │   │   │   ├── ProjectList.tsx
│   │   │   │   ├── ProjectCard.tsx
│   │   │   │   ├── ProjectCreate.tsx
│   │   │   │   └── ProjectWorkspace.tsx
│   │   │   ├── chat/
│   │   │   │   ├── ChatInterface.tsx
│   │   │   │   ├── ChatMessage.tsx
│   │   │   │   ├── ChatInput.tsx
│   │   │   │   └── ModelSelector.tsx
│   │   │   ├── repository/
│   │   │   │   ├── FileTree.tsx
│   │   │   │   ├── FileViewer.tsx
│   │   │   │   └── FileEditor.tsx
│   │   │   ├── settings/
│   │   │   │   ├── UserSettings.tsx
│   │   │   │   ├── LLMConfigurations.tsx
│   │   │   │   ├── ProfileSettings.tsx
│   │   │   │   └── CostOverview.tsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.tsx
│   │   │       ├── UserManagement.tsx
│   │   │       ├── CostManagement.tsx
│   │   │       ├── SystemSettings.tsx
│   │   │       ├── AuditLogs.tsx
│   │   │       └── Statistics.tsx
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── ProjectContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useApi.ts
│   │   │   └── useWebSocket.ts
│   │   ├── services/
│   │   │   ├── api.ts
│   │   │   ├── authService.ts
│   │   │   ├── projectService.ts
│   │   │   └── chatService.ts
│   │   ├── utils/
│   │   │   ├── constants.ts
│   │   │   ├── validators.ts
│   │   │   └── formatters.ts
│   │   ├── types/
│   │   │   ├── user.ts
│   │   │   ├── project.ts
│   │   │   ├── chat.ts
│   │   │   └── admin.ts
│   │   ├── App.tsx
│   │   └── index.tsx
│   └── tests/
└── nginx/
    ├── nginx.conf
    └── ssl/
```

---

## 🗄️ Datenbank-Schema

### Tabellen-Definitionen (PostgreSQL)

```sql
-- USERS TABLE
CREATE TABLE users (
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
CREATE TABLE user_settings (
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
CREATE TABLE projects (
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
CREATE TABLE project_tags (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    tag_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- LLM CONFIGURATIONS TABLE
CREATE TABLE llm_configurations (
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
CREATE TABLE chat_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
    title VARCHAR(255),
    llm_config_id UUID REFERENCES llm_configurations(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- CHAT MESSAGES TABLE
CREATE TABLE chat_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content TEXT NOT NULL,
    token_count INTEGER,
    context_files JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SKILLS TABLE
CREATE TABLE skills (
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
CREATE TABLE document_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    category VARCHAR(50) NOT NULL CHECK (category IN ('product', 'project', 'kleinmassnahme')),
    name VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- SYSTEM SETTINGS TABLE
CREATE TABLE system_settings (
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
CREATE TABLE llm_usage_logs (
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
CREATE TABLE cost_tracking (
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
CREATE TABLE audit_logs (
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

-- INDEXES
CREATE INDEX idx_projects_user_id ON projects(user_id);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_chat_sessions_project_id ON chat_sessions(project_id);
CREATE INDEX idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX idx_llm_usage_logs_user_id ON llm_usage_logs(user_id);
CREATE INDEX idx_llm_usage_logs_created_at ON llm_usage_logs(created_at);
CREATE INDEX idx_cost_tracking_user_id ON cost_tracking(user_id);
CREATE INDEX idx_cost_tracking_period ON cost_tracking(period_start, period_end);
CREATE INDEX idx_audit_logs_user_id ON audit_logs(user_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);
```

---

## 🔌 API-Endpunkte

### Authentication & Authorization

```
POST   /api/auth/register           - Benutzer-Registrierung
POST   /api/auth/login              - Login (JWT Token)
POST   /api/auth/logout             - Logout
POST   /api/auth/refresh-token      - Token erneuern
POST   /api/auth/forgot-password    - Passwort zurücksetzen
POST   /api/auth/reset-password     - Neues Passwort setzen
```

### User Management

```
GET    /api/users                   - Benutzerliste (Admin only)
GET    /api/users/me                - Eigenes Profil
PUT    /api/users/me                - Eigenes Profil aktualisieren
GET    /api/users/:id               - Benutzer-Details (Admin only)
PUT    /api/users/:id               - Benutzer aktualisieren (Admin only)
DELETE /api/users/:id               - Benutzer deaktivieren (Admin only)
POST   /api/users                   - Neuen Benutzer erstellen (Admin only)
```

### User Settings

```
GET    /api/users/me/settings       - Eigene Einstellungen
PUT    /api/users/me/settings       - Einstellungen aktualisieren
```

### LLM Configurations

```
GET    /api/users/me/llm-configs    - Eigene LLM-Konfigurationen
POST   /api/users/me/llm-configs    - Neue LLM-Konfiguration
PUT    /api/users/me/llm-configs/:id - LLM-Konfiguration aktualisieren
DELETE /api/users/me/llm-configs/:id - LLM-Konfiguration löschen
POST   /api/users/me/llm-configs/:id/test - Verbindung testen
```

### Projects

```
GET    /api/projects                - Liste aller Projekte des Users
POST   /api/projects                - Neues Projekt erstellen
GET    /api/projects/:id            - Projekt-Details
PUT    /api/projects/:id            - Projekt aktualisieren
DELETE /api/projects/:id            - Projekt löschen/archivieren
GET    /api/projects/:id/stats      - Projekt-Statistiken
```

### Repository/GitHub Integration

```
GET    /api/projects/:id/repository/tree     - Dateistruktur abrufen
GET    /api/projects/:id/repository/file     - Dateiinhalt lesen (query: path)
POST   /api/projects/:id/repository/file     - Neue Datei erstellen
PUT    /api/projects/:id/repository/file     - Datei aktualisieren
DELETE /api/projects/:id/repository/file     - Datei löschen
POST   /api/projects/:id/repository/folder   - Neuen Ordner erstellen
```

### Chat

```
GET    /api/projects/:id/chat/sessions       - Chat-Sessions abrufen
POST   /api/projects/:id/chat/sessions       - Neue Chat-Session
GET    /api/projects/:id/chat/sessions/:sessionId/messages - Nachrichtenverlauf
POST   /api/projects/:id/chat/sessions/:sessionId/messages - Nachricht senden
DELETE /api/projects/:id/chat/sessions/:sessionId - Session löschen
```

### Skills & Templates

```
GET    /api/skills                  - Verfügbare Skills (gefiltert nach Kategorie)
GET    /api/skills/:id              - Skill-Details
GET    /api/templates               - Verfügbare Dokumenten-Templates
GET    /api/templates/:id           - Template-Details
```

### Cost Tracking (User)

```
GET    /api/users/me/costs/current  - Aktuelle Periode
GET    /api/users/me/costs/history  - Historische Kosten
GET    /api/users/me/costs/breakdown - Aufschlüsselung nach Provider/Projekt
```

### Admin - User Management

```
GET    /api/admin/users             - Alle Benutzer mit Statistiken
GET    /api/admin/users/:id/projects - Projekte eines Benutzers
GET    /api/admin/users/:id/usage   - Nutzungsstatistiken
PUT    /api/admin/users/:id/role    - Benutzerrolle ändern
POST   /api/admin/users/:id/activate - Benutzer aktivieren
POST   /api/admin/users/:id/deactivate - Benutzer deaktivieren
```

### Admin - System Settings

```
GET    /api/admin/settings          - Alle System-Einstellungen
GET    /api/admin/settings/:key     - Einzelne Einstellung
PUT    /api/admin/settings/:key     - Einstellung aktualisieren
POST   /api/admin/settings          - Neue Einstellung erstellen
```

### Admin - Cost Management

```
GET    /api/admin/costs/overview    - Gesamt-Kostenübersicht
GET    /api/admin/costs/by-user     - Kosten pro Benutzer
GET    /api/admin/costs/by-provider - Kosten pro LLM-Provider
GET    /api/admin/costs/by-period   - Kosten nach Zeitraum
GET    /api/admin/costs/export      - Kosten-Report exportieren (CSV/PDF)
```

### Admin - Usage Statistics

```
GET    /api/admin/usage/statistics  - Nutzungsstatistiken
GET    /api/admin/usage/active-users - Aktive Benutzer
GET    /api/admin/usage/top-consumers - Top Token-Verbraucher
GET    /api/admin/usage/by-model    - Nutzung nach Modell
```

### Admin - Audit Logs

```
GET    /api/admin/audit-logs        - Audit-Logs abrufen (mit Filtern)
GET    /api/admin/audit-logs/user/:id - Logs für spezifischen Benutzer
```

---

## 🔐 Sicherheits-Implementierung

### JWT Authentication

**Access Token:**
- Gültigkeit: 15 Minuten
- Payload: `{ userId, email, role }`
- Verwendung: In jedem API-Request im Authorization Header

**Refresh Token:**
- Gültigkeit: 7 Tage
- Nur für `/api/auth/refresh-token` Endpoint
- Wird in HTTP-Only Cookie gespeichert

### API-Key Verschlüsselung

```javascript
// Encryption Service Beispiel (Node.js)
const crypto = require('crypto');

const ALGORITHM = 'aes-256-gcm';
const KEY = process.env.ENCRYPTION_KEY; // 32 bytes
const IV_LENGTH = 16;
const SALT_LENGTH = 64;
const TAG_LENGTH = 16;

function encrypt(text) {
  const iv = crypto.randomBytes(IV_LENGTH);
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = crypto.pbkdf2Sync(KEY, salt, 100000, 32, 'sha512');
  
  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const encrypted = Buffer.concat([cipher.update(text, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();
  
  return Buffer.concat([salt, iv, tag, encrypted]).toString('base64');
}

function decrypt(encryptedText) {
  const buffer = Buffer.from(encryptedText, 'base64');
  
  const salt = buffer.slice(0, SALT_LENGTH);
  const iv = buffer.slice(SALT_LENGTH, SALT_LENGTH + IV_LENGTH);
  const tag = buffer.slice(SALT_LENGTH + IV_LENGTH, SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  const encrypted = buffer.slice(SALT_LENGTH + IV_LENGTH + TAG_LENGTH);
  
  const key = crypto.pbkdf2Sync(KEY, salt, 100000, 32, 'sha512');
  
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);
  
  return decipher.update(encrypted) + decipher.final('utf8');
}
```

### Role-Based Access Control (RBAC)

```javascript
// Middleware Beispiel
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Nicht authentifiziert' });
    }
    
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Keine Berechtigung' });
    }
    
    next();
  };
}

// Verwendung in Routes
router.get('/admin/users', requireRole('admin'), adminController.getUsers);
```

### Rate Limiting

```javascript
// Rate Limiter Konfiguration
const rateLimit = require('express-rate-limit');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 Minuten
  max: 5, // 5 Versuche
  message: 'Zu viele Login-Versuche. Bitte versuchen Sie es später erneut.'
});

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 Minute
  max: 100 // 100 Requests pro Minute
});

const llmLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20, // 20 LLM-Anfragen pro Minute
  keyGenerator: (req) => req.user.id
});
```

---

## 🤖 LLM-Integration

### Unterstützte Provider

1. **OpenAI**
   - API Endpoint: `https://api.openai.com/v1/chat/completions`
   - Modelle: gpt-4, gpt-4-turbo, gpt-3.5-turbo
   
2. **Anthropic Claude**
   - API Endpoint: `https://api.anthropic.com/v1/messages`
   - Modelle: claude-3-opus, claude-3-sonnet, claude-3-haiku
   
3. **Mistral AI**
   - API Endpoint: `https://api.mistral.ai/v1/chat/completions`
   - Modelle: mistral-large, mistral-medium, mistral-small

### LLM Service Abstraktion

```javascript
class LLMService {
  async sendMessage(config, messages, contextFiles = []) {
    // 1. Context aus Repository-Dateien erstellen
    const context = await this.buildContext(contextFiles);
    
    // 2. Skill-basiertes Prompt-Engineering
    const skill = await this.getSkill(config.category);
    const enhancedMessages = this.applySkill(messages, skill, context);
    
    // 3. Provider-spezifische Anfrage
    const response = await this.callProvider(config, enhancedMessages);
    
    // 4. Token-Zählung und Kosten-Logging
    await this.logUsage(config, response);
    
    return response;
  }
  
  async callProvider(config, messages) {
    switch (config.provider_name) {
      case 'openai':
        return this.callOpenAI(config, messages);
      case 'anthropic':
        return this.callAnthropic(config, messages);
      case 'mistral':
        return this.callMistral(config, messages);
      default:
        throw new Error('Unsupported provider');
    }
  }
}
```

### Pricing Configuration

```javascript
const LLM_PRICING = {
  openai: {
    'gpt-4': { input: 0.03, output: 0.06 },
    'gpt-4-turbo': { input: 0.01, output: 0.03 },
    'gpt-3.5-turbo': { input: 0.0015, output: 0.002 }
  },
  anthropic: {
    'claude-3-opus': { input: 0.015, output: 0.075 },
    'claude-3-sonnet': { input: 0.003, output: 0.015 },
    'claude-3-haiku': { input: 0.00025, output: 0.00125 }
  },
  mistral: {
    'mistral-large': { input: 0.008, output: 0.024 },
    'mistral-medium': { input: 0.0027, output: 0.0081 },
    'mistral-small': { input: 0.001, output: 0.003 }
  }
};

function calculateCost(provider, model, promptTokens, completionTokens) {
  const pricing = LLM_PRICING[provider]?.[model];
  if (!pricing) return 0;
  
  const inputCost = (promptTokens / 1000) * pricing.input;
  const outputCost = (completionTokens / 1000) * pricing.output;
  
  return inputCost + outputCost;
}
```

---

## 📂 GitHub-Integration

### Repository-Struktur

Bei Projekt-Erstellung wird folgende Struktur automatisch angelegt:

```
{short_name}/
├── README.md               # Projekt-Beschreibung
└── Dokumente/             # Hauptordner für Konzepte
    ├── .gitkeep
    └── (weitere Unterordner und Dateien)
```

### GitHub Service Implementierung

```javascript
const { Octokit } = require('@octokit/rest');

class GitHubService {
  constructor(accessToken) {
    this.octokit = new Octokit({ auth: accessToken });
  }
  
  async createRepository(name, description) {
    const { data } = await this.octokit.repos.createForAuthenticatedUser({
      name,
      description,
      private: true,
      auto_init: true
    });
    return data;
  }
  
  async createFile(owner, repo, path, content, message) {
    const { data } = await this.octokit.repos.createOrUpdateFileContents({
      owner,
      repo,
      path,
      message,
      content: Buffer.from(content).toString('base64')
    });
    return data;
  }
  
  async getFileContent(owner, repo, path) {
    const { data } = await this.octokit.repos.getContent({
      owner,
      repo,
      path
    });
    return Buffer.from(data.content, 'base64').toString('utf8');
  }
  
  async getTree(owner, repo, tree_sha = 'HEAD', recursive = true) {
    const { data } = await this.octokit.git.getTree({
      owner,
      repo,
      tree_sha,
      recursive: recursive ? 1 : 0
    });
    return data.tree;
  }
  
  async initializeProjectStructure(owner, repo, description) {
    // README.md erstellen
    await this.createFile(
      owner,
      repo,
      'README.md',
      `# ${repo}\n\n${description || 'Projekt-Beschreibung'}`,
      'Initial commit: README.md'
    );
    
    // Dokumente Ordner mit .gitkeep erstellen
    await this.createFile(
      owner,
      repo,
      'Dokumente/.gitkeep',
      '',
      'Initial commit: Create Dokumente folder'
    );
  }
}
```

---

## 🎨 Frontend-Komponenten

### Haupt-Routen

```javascript
// App.tsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          
          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectWorkspace />} />
            <Route path="/settings" element={<UserSettings />} />
            
            {/* Admin Routes */}
            <Route element={<AdminRoute />}>
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/admin/users" element={<UserManagement />} />
              <Route path="/admin/costs" element={<CostManagement />} />
              <Route path="/admin/settings" element={<SystemSettings />} />
              <Route path="/admin/audit-logs" element={<AuditLogs />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

### Projekt-Workspace Layout

```
┌────────────────────────────────────────────────────────────┐
│ Header: Projekt-Titel | User-Menu                          │
├──────────────┬─────────────────────────────────────────────┤
│              │                                             │
│  Dateibaum   │          Chat-Interface                     │
│              │                                             │
│  └─ README   │  ┌───────────────────────────────────────┐ │
│  └─ Dokumente│  │ Chat-Verlauf                          │ │
│     └─ ...   │  │                                       │ │
│              │  │ [User]: Erstelle Produktvision        │ │
│              │  │ [Assistant]: Gerne! Hier ist...       │ │
│              │  │                                       │ │
│              │  └───────────────────────────────────────┘ │
│              │                                             │
│              │  Modell: [Claude 3 Opus ▼]                 │
│              │  ┌───────────────────────────────────────┐ │
│              │  │ Nachricht eingeben...                 │ │
│              │  └───────────────────────────────────────┘ │
│              │                                [Senden]     │
└──────────────┴─────────────────────────────────────────────┘
```

---

## 🎯 Kategorie-spezifische Skills

### Produkt-Kategorie

```javascript
const PRODUCT_SKILLS = [
  {
    name: 'Produktvision erstellen',
    prompt_template: `Du bist ein Produktmanagement-Experte. Erstelle eine umfassende Produktvision basierend auf folgenden Informationen:

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

Verwende professionelle, präzise Sprache.`
  },
  {
    name: 'User Stories generieren',
    prompt_template: `Erstelle User Stories im Format: "Als [Rolle] möchte ich [Funktion], damit [Nutzen]"
    
Kontext: {{USER_INPUT}}
    
Berücksichtige dabei:
- Akzeptanzkriterien
- Story Points Schätzung
- Abhängigkeiten`
  },
  // weitere Skills...
];
```

### Projekt-Kategorie

```javascript
const PROJECT_SKILLS = [
  {
    name: 'Projektplan erstellen',
    prompt_template: `Erstelle einen detaillierten Projektplan mit:
- Projektphasen
- Meilensteine
- Ressourcenplanung
- Zeitplan
- Risiken und Abhängigkeiten`
  },
  // weitere Skills...
];
```

### Kleinmaßnahme-Kategorie

```javascript
const KLEINMASSNAHME_SKILLS = [
  {
    name: 'Quick-Konzept',
    prompt_template: `Erstelle ein kompaktes Konzept (max. 2 Seiten) mit:
- Zielsetzung
- Vorgehen
- Aufwand (Schätzung)
- Erwartete Ergebnisse`
  },
  // weitere Skills...
];
```

---

## 🐳 Docker-Konfiguration

### docker-compose.yml

```yaml
version: '3.8'

services:
  postgres:
    image: postgres:15
    container_name: konzept-app-db
    environment:
      POSTGRES_DB: konzept_app
      POSTGRES_USER: konzept_user
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U konzept_user -d konzept_app"]
      interval: 10s
      timeout: 5s
      retries: 5
    networks:
      - konzept-network

  backend:
    build:
      context: ./backend
      dockerfile: Dockerfile
    container_name: konzept-app-backend
    environment:
      NODE_ENV: production
      DATABASE_URL: postgresql://konzept_user:${DB_PASSWORD}@postgres:5432/konzept_app
      JWT_SECRET: ${JWT_SECRET}
      JWT_REFRESH_SECRET: ${JWT_REFRESH_SECRET}
      ENCRYPTION_KEY: ${ENCRYPTION_KEY}
      PORT: 3001
    depends_on:
      postgres:
        condition: service_healthy
    ports:
      - "3001:3001"
    volumes:
      - ./backend:/app
      - /app/node_modules
    networks:
      - konzept-network
    restart: unless-stopped

  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    container_name: konzept-app-frontend
    environment:
      REACT_APP_API_URL: http://localhost:3001
      REACT_APP_WS_URL: ws://localhost:3001
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules
    depends_on:
      - backend
    networks:
      - konzept-network
    restart: unless-stopped

  nginx:
    image: nginx:alpine
    container_name: konzept-app-nginx
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx/nginx.conf:/etc/nginx/nginx.conf:ro
      - ./nginx/ssl:/etc/nginx/ssl:ro
    depends_on:
      - frontend
      - backend
    networks:
      - konzept-network
    restart: unless-stopped

volumes:
  postgres_data:

networks:
  konzept-network:
    driver: bridge
```

### Backend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3001

CMD ["npm", "start"]
```

### Frontend Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

---

## 🔧 Environment-Variablen

### .env.example

```env
# Database
DB_PASSWORD=your_secure_password_here

# JWT
JWT_SECRET=your_jwt_secret_min_32_chars
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars

# Encryption
ENCRYPTION_KEY=your_32_byte_encryption_key_here

# Admin Account (für initiale Einrichtung)
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_admin_password

# Backend
PORT=3001
NODE_ENV=development

# Frontend
REACT_APP_API_URL=http://localhost:3001
REACT_APP_WS_URL=ws://localhost:3001

# Optional: SMTP für Email-Versand
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=noreply@example.com
SMTP_PASSWORD=smtp_password
SMTP_FROM=noreply@example.com
```

---

## 📊 System-Settings (Initialisierung)

```sql
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
('password_require_special', 'true', 'boolean', 'Sonderzeichen im Passwort erforderlich', 'security', true);
```

---

## 🚀 Deployment-Schritte

### 1. Vorbereitung

```bash
# Repository klonen
git clone <repository-url>
cd konzept-app

# Environment-Datei erstellen
cp .env.example .env
# .env bearbeiten und alle Werte setzen
```

### 2. SSL-Zertifikate (für Produktion)

```bash
# Let's Encrypt Zertifikat erstellen
certbot certonly --standalone -d your-domain.com

# Zertifikate nach nginx/ssl kopieren
cp /etc/letsencrypt/live/your-domain.com/fullchain.pem nginx/ssl/
cp /etc/letsencrypt/live/your-domain.com/privkey.pem nginx/ssl/
```

### 3. Docker-Container starten

```bash
# Container bauen und starten
docker-compose up -d

# Logs überprüfen
docker-compose logs -f

# Status überprüfen
docker-compose ps
```

### 4. Datenbank initialisieren

```bash
# Wenn init.sql nicht automatisch ausgeführt wurde
docker-compose exec postgres psql -U konzept_user -d konzept_app -f /docker-entrypoint-initdb.d/init.sql
```

### 5. Admin-Benutzer erstellen

```bash
# Via Backend-Script oder direkt in DB
docker-compose exec backend node scripts/create-admin.js
```

### 6. Zugriff

- Frontend: http://localhost:3000
- Backend API: http://localhost:3001
- Postgres: localhost:5432

---

## 🧪 Testing

### Backend Tests

```bash
cd backend
npm test                 # Alle Tests
npm run test:unit        # Unit Tests
npm run test:integration # Integration Tests
npm run test:coverage    # Coverage Report
```

### Frontend Tests

```bash
cd frontend
npm test                 # Jest Tests
npm run test:e2e         # E2E Tests (Cypress/Playwright)
```

---

## 📝 Implementierungs-Prioritäten

### Phase 1: MVP (Minimal Viable Product)
1. ✅ Datenbank-Schema erstellen
2. ✅ Authentifizierung (Login/Register)
3. ✅ Basis-User-Management
4. ✅ Projekt-Erstellung
5. ✅ GitHub-Integration (Repository-Erstellung)
6. ✅ Einfaches Chat-Interface
7. ✅ LLM-Integration (mindestens ein Provider)
8. ✅ Repository-Browser (read-only)

### Phase 2: Core Features
1. ✅ Multi-LLM-Support
2. ✅ LLM-Konfigurationsverwaltung
3. ✅ Kategorie-Skills implementieren
4. ✅ Datei-Editor
5. ✅ Chat-History persistieren
6. ✅ Token-Tracking und Kostenberechnung
7. ✅ User-Settings

### Phase 3: Admin & Analytics
1. ✅ Admin-Dashboard
2. ✅ Benutzerverwaltung (Admin)
3. ✅ Kostenverwaltung und Reports
4. ✅ System-Einstellungen
5. ✅ Audit-Logs
6. ✅ Nutzungsstatistiken

### Phase 4: Enhanced Features
1. ⬜ Template-System
2. ⬜ Erweiterte GitHub-Operations
3. ⬜ Kontext-Management optimieren
4. ⬜ Export-Funktionen (PDF, Word)
5. ⬜ Collaboration-Features
6. ⬜ WebSocket für Real-time Updates

---

## 🔍 Wichtige Hinweise

### GitHub API Rate Limits
- Authentifizierte Requests: 5.000/Stunde
- Token-basierte Requests: 5.000/Stunde pro Token
- Implementiere Caching für häufige Abfragen

### LLM API Limits
- OpenAI: Abhängig vom Account-Tier
- Anthropic: Rate Limits nach Modell
- Implementiere Queue-System für hohe Last

### Sicherheit
- NIEMALS API-Keys im Frontend speichern
- Alle API-Keys verschlüsselt in DB
- Input-Validierung auf Backend-Seite
- SQL-Injection Prevention (Prepared Statements)
- XSS-Prevention (Content Security Policy)

### Performance
- Indexe auf häufig abgefragte Spalten
- Paginierung für große Datenmengen
- Caching für statische Daten
- Lazy Loading im Frontend

---

## 📚 Dokumentation & Support

### API-Dokumentation
- Swagger/OpenAPI für Backend-API
- Postman Collection bereitstellen

### User-Guide
- Benutzerhandbuch für Standard-User
- Admin-Handbuch für Administratoren
- Video-Tutorials (optional)

### Entwickler-Dokumentation
- Code-Kommentare
- Architektur-Diagramme
- Contribution Guidelines

---

## 🎉 Erfolgskriterien

Das Projekt gilt als erfolgreich implementiert, wenn:

1. ✅ Benutzer können sich registrieren und anmelden
2. ✅ Projekte können erstellt und verwaltet werden
3. ✅ GitHub-Repositories werden automatisch angelegt
4. ✅ Chat-Interface funktioniert mit mindestens einem LLM
5. ✅ Repository-Dateien können durchsucht und angezeigt werden
6. ✅ Kosten werden getrackt und sind einsehbar
7. ✅ Admin-Bereich ist funktional
8. ✅ System ist performant und sicher
9. ✅ Docker-Deployment funktioniert
10. ✅ Tests decken kritische Funktionen ab

---

## 🛠️ Nächste Schritte zur Implementierung

1. **Projekt initialisieren**
   ```bash
   mkdir konzept-app
   cd konzept-app
   mkdir -p backend frontend database nginx
   ```

2. **Git Repository erstellen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

3. **Backend aufsetzen**
   - Package.json erstellen
   - Dependencies installieren
   - Datenbankverbindung konfigurieren
   - Basis-Server aufsetzen

4. **Frontend initialisieren**
   - React-App mit TypeScript erstellen
   - Routing konfigurieren
   - Basis-Komponenten erstellen

5. **Datenbank**
   - Schema implementieren
   - Migrations erstellen
   - Seeds für Entwicklung

6. **Docker**
   - Dockerfiles erstellen
   - docker-compose.yml konfigurieren
   - Testen

---

**Version:** 1.0  
**Letzte Aktualisierung:** 2024  
**Autor:** System Architect

---

Diese Spezifikation bietet eine vollständige Grundlage für die Implementierung der Konzept-Erstellungs-Applikation. Alle wesentlichen Aspekte von Architektur, Datenbank, API, Sicherheit und Deployment sind dokumentiert und können direkt in die Umsetzung überführt werden.
