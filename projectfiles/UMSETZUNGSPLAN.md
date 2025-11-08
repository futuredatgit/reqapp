# Umsetzungsplan - Konzept-Erstellungs-Applikation

## 📋 Projekt-Übersicht

**Projektname**: ReqApp - Konzept-Erstellungs-Applikation  
**Technologie-Stack**: React/TypeScript, Node.js/Express, PostgreSQL, Docker  
**Ziel**: Webbasierte Anwendung zur Erstellung von Konzepten mit KI-Unterstützung und GitHub-Integration  
**Status**: Planungsphase → Umsetzung  
**Datum**: 8. November 2025

---

## 🏗️ Technische Architektur

### Core Technologies
- **Frontend**: React 18+ mit TypeScript
- **Backend**: Node.js mit Express (TypeScript)
- **Datenbank**: PostgreSQL 15
- **Container**: Docker + Docker Compose
- **Version Control**: GitHub API v3/v4
- **Authentication**: JWT (Access + Refresh Token)

### Externe Services
- **LLM-Provider**: OpenAI, Anthropic Claude, Mistral AI
- **GitHub API**: Repository-Verwaltung, Datei-Operationen

### Entwicklungs-Tools
- **ORM**: Prisma
- **API-Client**: Axios
- **State Management**: React Context API
- **UI-Framework**: Material-UI oder Tailwind CSS
- **Charts**: Recharts

---

## 📅 Implementierungs-Roadmap (12 Phasen)

### **Phase 1: Projekt-Setup und Infrastructure** ⏳
**Dauer**: 2-3 Tage  
**Status**: In Bearbeitung  

#### Aufgaben:
- [x] Projektverzeichnis und Ordnerstruktur erstellen
- [ ] Docker-Compose-Setup mit PostgreSQL, Backend, Frontend
- [ ] Package.json für Backend und Frontend
- [ ] TypeScript-Konfiguration
- [ ] ESLint + Prettier Setup
- [ ] Git Repository initialisieren

#### Deliverables:
```
konzept-app/
├── docker-compose.yml
├── .env.example
├── backend/
├── frontend/
├── database/
└── nginx/
```

---

### **Phase 2: Datenbank-Schema implementieren**
**Dauer**: 3-4 Tage  
**Abhängigkeiten**: Phase 1  

#### Aufgaben:
- [ ] PostgreSQL-Schema laut Spezifikation erstellen (15+ Tabellen)
- [ ] Prisma-Schema definieren
- [ ] Migrations-Scripts entwickeln
- [ ] Datenbank-Indizes optimieren
- [ ] Seed-Daten für Entwicklung

#### Kern-Tabellen:
- `users` (mit verschlüsselten GitHub-Tokens)
- `projects` (Kategorien: product, project, kleinmassnahme)
- `llm_configurations` (verschlüsselte API-Keys)
- `chat_sessions` + `chat_messages`
- `llm_usage_logs` (Token-Tracking)
- `cost_tracking` (Aggregierte Kosten)
- `audit_logs` (Admin-Überwachung)

---

### **Phase 3: Authentication & Authorization Backend**
**Dauer**: 4-5 Tage  
**Abhängigkeiten**: Phase 2  

#### Aufgaben:
- [ ] JWT-Service (Access + Refresh Token)
- [ ] Benutzer-Registration/Login/Logout
- [ ] Passwort-Hashing (bcrypt)
- [ ] Role-Based Access Control (User/Admin)
- [ ] Verschlüsselungsservice für API-Keys (AES-256-GCM)
- [ ] Rate Limiting Middleware

#### API-Endpunkte:
```
POST /api/auth/register
POST /api/auth/login
POST /api/auth/logout
POST /api/auth/refresh-token
POST /api/auth/forgot-password
```

---

### **Phase 4: User Management & Settings API**
**Dauer**: 3-4 Tage  
**Abhängigkeiten**: Phase 3  

#### Aufgaben:
- [ ] User-Profilverwaltung (CRUD)
- [ ] User-Settings (Sprache, Theme, Timezone)
- [ ] LLM-Konfigurationen (CRUD mit Verschlüsselung)
- [ ] LLM-Verbindungstest
- [ ] Input-Validierung und Sanitisierung

#### API-Endpunkte:
```
GET/PUT /api/users/me
GET/PUT /api/users/me/settings
GET/POST/PUT/DELETE /api/users/me/llm-configs
POST /api/users/me/llm-configs/:id/test
```

---

### **Phase 5: GitHub-Integration Service**
**Dauer**: 5-6 Tage  
**Abhängigkeiten**: Phase 4  

#### Aufgaben:
- [ ] GitHub-API-Client implementieren
- [ ] Repository-Erstellung (private Repos)
- [ ] Dateioperationen (CRUD)
- [ ] Dateibaum-Abruf (rekursiv)
- [ ] GitHub-Token-Management
- [ ] Error-Handling für API-Limits

#### Repository-Struktur:
```
{project_name}/
├── README.md
└── Dokumente/
    └── .gitkeep
```

#### API-Endpunkte:
```
GET /api/projects/:id/repository/tree
GET /api/projects/:id/repository/file?path=
POST /api/projects/:id/repository/file
PUT /api/projects/:id/repository/file
```

---

### **Phase 6: LLM-Integration Framework**
**Dauer**: 6-7 Tage  
**Abhängigkeiten**: Phase 5  

#### Aufgaben:
- [ ] Multi-Provider-LLM-Service (OpenAI, Anthropic, Mistral)
- [ ] Token-Counting und Kosten-Berechnung
- [ ] Skill-System für Kategorie-spezifische Prompts
- [ ] Context-Management (Repository-Dateien)
- [ ] Streaming-Responses (WebSocket/SSE)
- [ ] Error-Handling und Retry-Logic

#### Unterstützte Modelle:
- **OpenAI**: gpt-4, gpt-4-turbo, gpt-3.5-turbo
- **Anthropic**: claude-3-opus, claude-3-sonnet, claude-3-haiku
- **Mistral**: mistral-large, mistral-medium, mistral-small

---

### **Phase 7: Projekt-Management Backend**
**Dauer**: 4-5 Tage  
**Abhängigkeiten**: Phase 6  

#### Aufgaben:
- [ ] Projekt CRUD-Operationen
- [ ] Projekt-Kategorisierung und Tags
- [ ] Chat-Sessions-Management
- [ ] Repository-Kontext für LLM-Anfragen
- [ ] Projekt-Statistiken

#### API-Endpunkte:
```
GET/POST /api/projects
GET/PUT/DELETE /api/projects/:id
GET/POST /api/projects/:id/chat/sessions
POST /api/projects/:id/chat/sessions/:sessionId/messages
```

---

### **Phase 8: Frontend Core Components**
**Dauer**: 5-6 Tage  
**Abhängigkeiten**: Phase 7  

#### Aufgaben:
- [ ] React-App mit TypeScript initialisieren
- [ ] Authentication-Context und Protected Routes
- [ ] Basis-UI-Komponenten (Header, Sidebar, Loading)
- [ ] API-Service-Layer
- [ ] Error-Boundary und Error-Handling
- [ ] Theme-System (Light/Dark Mode)

#### Komponenten-Struktur:
```
src/
├── components/common/
├── components/auth/
├── contexts/
├── hooks/
├── services/
└── types/
```

---

### **Phase 9: Projekt-Workspace Frontend**
**Dauer**: 7-8 Tage  
**Abhängigkeiten**: Phase 8  

#### Aufgaben:
- [ ] Projekt-Dashboard und -Liste
- [ ] Dateibaum-Komponente (expandierbar)
- [ ] Chat-Interface mit Message-History
- [ ] Repository-Browser und -Editor
- [ ] LLM-Model-Selektor
- [ ] Real-time Updates (WebSocket)

#### UI-Layout:
```
┌─────────────────────────────────────────┐
│ Header: Projekt | User-Menu             │
├─────────────┬───────────────────────────┤
│ Dateibaum   │ Chat-Interface           │
│ └─ README   │ ┌─────────────────────┐   │
│ └─ Dokumente│ │ Chat-Verlauf        │   │
│    └─ ...   │ │ [User]: ...         │   │
│             │ │ [AI]: ...           │   │
│             │ └─────────────────────┘   │
│             │ [Model ▼] [Send]          │
└─────────────┴───────────────────────────┘
```

---

### **Phase 10: Admin-Dashboard**
**Dauer**: 6-7 Tage  
**Abhängigkeiten**: Phase 9  

#### Aufgaben:
- [ ] Admin-Routing und Schutz
- [ ] Benutzerverwaltung (CRUD, Aktivierung)
- [ ] Kostenverwaltung und Reports
- [ ] System-Einstellungen (Key-Value-Store)
- [ ] Audit-Logs mit Filtern
- [ ] Nutzungsstatistiken und Charts

#### Admin-Features:
- Alle Benutzer mit Statistiken
- Gesamtkosten nach Provider/Zeitraum
- Token-Verbrauch Top-Listen
- System-Limits konfigurieren
- Export-Funktionen (CSV/PDF)

---

### **Phase 11: Testing & Quality Assurance**
**Dauer**: 5-6 Tage  
**Abhängigkeiten**: Phase 10  

#### Aufgaben:
- [ ] Unit-Tests für Backend-Services
- [ ] API-Integration-Tests
- [ ] Frontend-Komponenten-Tests (Jest/RTL)
- [ ] End-to-End-Tests (Playwright/Cypress)
- [ ] Code-Coverage > 80%
- [ ] Performance-Tests

#### Test-Tools:
- **Backend**: Jest, Supertest
- **Frontend**: Jest, React Testing Library
- **E2E**: Playwright oder Cypress
- **Coverage**: Istanbul/nyc

---

### **Phase 12: Deployment & Documentation**
**Dauer**: 4-5 Tage  
**Abhängigkeiten**: Phase 11  

#### Aufgaben:
- [ ] Production-Docker-Setup finalisieren
- [ ] SSL-Zertifikate (Let's Encrypt)
- [ ] Environment-Management
- [ ] API-Dokumentation (Swagger/OpenAPI)
- [ ] User-Guide erstellen
- [ ] Admin-Handbuch
- [ ] Deployment-Scripts

#### Documentation:
- API-Dokumentation (Swagger UI)
- User-Guide mit Screenshots
- Admin-Handbuch
- Developer-Setup-Guide
- Troubleshooting-Guide

---

## 🎯 Erfolgskriterien

### MVP (Nach Phase 9):
- [x] Benutzer können sich registrieren/anmelden
- [ ] Projekte erstellen und GitHub-Repos anlegen
- [ ] Chat mit mindestens einem LLM-Provider
- [ ] Repository-Dateien browsen und bearbeiten
- [ ] Kosten werden getrackt

### Vollversion (Nach Phase 12):
- [ ] Multi-LLM-Support mit Konfiguration
- [ ] Admin-Dashboard voll funktional
- [ ] Skill-basierte Prompts für alle Kategorien
- [ ] Umfassende Tests und Dokumentation
- [ ] Production-Ready Deployment

---

## ⚠️ Risiken und Abhängigkeiten

### Technische Risiken:
- **GitHub API Rate Limits**: 5.000 Requests/Stunde
- **LLM API Costs**: Überwachung und Limits erforderlich
- **Token-Counting**: Provider-spezifische Implementierung

### Externe Abhängigkeiten:
- GitHub API Verfügbarkeit
- LLM-Provider-APIs (OpenAI, Anthropic, Mistral)
- SSL-Zertifikate für Production

### Mitigation:
- Caching für GitHub-API-Calls
- Queue-System für hohe LLM-Last
- Fallback-Mechanismen
- Monitoring und Alerting

---

## 🚀 Nächste Schritte

### Sofort:
1. **Docker-Setup** vervollständigen
2. **Datenbank-Schema** implementieren
3. **Authentication** entwickeln

### Diese Woche:
- Phase 1-3 abschließen
- Development-Environment stabilisieren
- Erste API-Endpunkte testen

### Nächste Iteration:
- GitHub-Integration testen
- Ersten LLM-Provider integrieren
- Frontend-Grundgerüst aufbauen

---

**Erstellt**: 8. November 2025  
**Version**: 1.0  
**Nächstes Update**: Nach Abschluss Phase 3