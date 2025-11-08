# 🚀 ReqApp - Konzept-Erstellungs-Applikation

Eine webbasierte Anwendung zur Erstellung und Verwaltung von Konzepten und Anforderungsdokumenten mit KI-Unterstützung und GitHub-Integration.

## 📋 Übersicht

**ReqApp** ermöglicht es Benutzern, Projekte zu erstellen, die automatisch in privaten GitHub-Repositories angelegt werden, und mittels verschiedener LLM-APIs (OpenAI, Anthropic, Mistral) strukturierte Konzepte zu entwickeln.

### ✨ Hauptfunktionen

- **🔐 Benutzerauthentifizierung** - JWT-basiertes Login-System
- **📁 Projektverwaltung** - Kategorisierung (Produkt, Projekt, Kleinmaßnahme)  
- **🐙 GitHub-Integration** - Automatische Repository-Erstellung und -Verwaltung
- **🤖 LLM-Integration** - Multi-Provider-Support (OpenAI, Anthropic, Mistral)
- **💬 Chat-Interface** - Strukturierte Konzept-Erstellung mit KI-Unterstützung
- **📊 Kostenverfolgung** - Token-Tracking und Kostenanalyse
- **👑 Admin-Dashboard** - Benutzerverwaltung und Systemüberwachung

## 🛠️ Technologie-Stack

- **Frontend**: React 18 + TypeScript + Material-UI
- **Backend**: Node.js + Express + TypeScript
- **Datenbank**: PostgreSQL 15
- **Container**: Docker + Docker Compose
- **Authentication**: JWT (Access + Refresh Token)
- **ORM**: Prisma (wird in Phase 2 hinzugefügt)

## 🚦 Setup und Installation

### Voraussetzungen

- Docker & Docker Compose
- Node.js 18+ (für lokale Entwicklung)
- Git

### 1. Repository klonen

```bash
git clone <repository-url>
cd reqapp
```

### 2. Environment-Variablen konfigurieren

```bash
# .env-Datei erstellen
cp .env.example .env

# .env bearbeiten und alle erforderlichen Werte setzen
nano .env
```

**Wichtige Umgebungsvariablen:**
```env
DB_PASSWORD=your_secure_password_here
JWT_SECRET=your_jwt_secret_min_32_chars_here
JWT_REFRESH_SECRET=your_refresh_secret_min_32_chars_here
ENCRYPTION_KEY=your_32_byte_encryption_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=secure_admin_password
```

### 3. Docker-Container starten

```bash
# Container bauen und starten
docker-compose up -d

# Logs verfolgen
docker-compose logs -f

# Status prüfen
docker-compose ps
```

### 4. Anwendung aufrufen

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001/api
- **Health Check**: http://localhost:3001/api/health
- **Database**: localhost:5432

## 📁 Projektstruktur

```
reqapp/
├── docker-compose.yml          # Docker-Orchestrierung
├── .env.example               # Environment-Template
├── backend/                   # Node.js/Express Backend
│   ├── src/
│   │   ├── config/           # Konfigurationsdateien
│   │   ├── middleware/       # Express-Middleware
│   │   ├── utils/            # Hilfsfunktionen
│   │   └── server.ts         # Haupteinstiegspunkt
│   ├── package.json
│   ├── tsconfig.json
│   ├── Dockerfile
│   └── .eslintrc.js
├── frontend/                  # React/TypeScript Frontend
│   ├── src/
│   │   ├── components/       # React-Komponenten
│   │   ├── contexts/         # React-Contexts
│   │   ├── hooks/            # Custom-Hooks
│   │   ├── services/         # API-Services
│   │   ├── types/            # TypeScript-Definitionen
│   │   └── utils/            # Hilfsfunktionen
│   ├── public/
│   ├── package.json
│   ├── tsconfig.json
│   └── Dockerfile
├── database/                  # PostgreSQL-Setup
│   └── init.sql              # Datenbank-Schema
├── nginx/                     # Reverse-Proxy
│   ├── nginx.conf            # Nginx-Konfiguration
│   └── ssl/                  # SSL-Zertifikate
└── projectfiles/             # Projektdokumentation
    ├── PROJECT_SPECIFICATION.md
    ├── claude.md             # Entwickler-Präferenzen
    └── UMSETZUNGSPLAN.md     # 12-Phasen-Plan
```

## 🔄 Entwicklungs-Workflow

### Lokale Entwicklung

```bash
# Backend entwickeln
cd backend
npm install
npm run dev

# Frontend entwickeln  
cd frontend
npm install
npm start

# Database Schema updates
cd backend
npm run db:migrate
npm run db:generate
```

### Code-Qualität

```bash
# Linting
npm run lint
npm run lint:fix

# Formatierung
npm run format

# Tests
npm test
npm run test:coverage
```

## 📊 Entwicklungsfortschritt

### ✅ Phase 1: Setup abgeschlossen (8. November 2025)
- [x] Docker-Compose-Umgebung
- [x] Backend-Grundgerüst (TypeScript/Express)
- [x] Frontend-Grundgerüst (React/TypeScript)  
- [x] PostgreSQL-Datenbank mit vollständigem Schema
- [x] Nginx-Reverse-Proxy
- [x] ESLint + Prettier Konfiguration

### 🔄 Nächste Phasen
- **Phase 2**: Datenbank-Schema + Prisma ORM
- **Phase 3**: JWT-Authentication & Authorization  
- **Phase 4**: User Management & Settings API
- **Phase 5**: GitHub-Integration Service
- **Phase 6**: LLM-Integration Framework

## 🐛 Troubleshooting

### Häufige Probleme

**Container starten nicht:**
```bash
# Logs prüfen
docker-compose logs
# Ports freigeben
sudo lsof -i :3000
sudo lsof -i :3001
sudo lsof -i :5432
```

**Datenbank-Verbindung fehlschlägt:**
```bash
# PostgreSQL-Status prüfen
docker-compose exec postgres pg_isready -U reqapp_user -d reqapp
# Logs der Datenbank
docker-compose logs postgres
```

**Build-Fehler:**
```bash
# Clean rebuild
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## 🤝 Contribution

### Code-Standards
- **TypeScript** für alle neuen Module
- **Deutsche Kommentare** in Code  
- **Englische** Variablen- und Funktionsnamen
- **Funktionen ≤ 20 Zeilen**
- **DRY-Prinzip** befolgen
- **Try-Catch** bei async/await

### Git-Workflow
- **Feature-Branches** verwenden
- **Conventional Commits** auf Deutsch
- **Code-Review** vor Merge
- **Tests** müssen grün sein

## 📖 Dokumentation

- **[Projekt-Spezifikation](./projectfiles/PROJECT_SPECIFICATION.md)** - Vollständige technische Spezifikation
- **[Umsetzungsplan](./projectfiles/UMSETZUNGSPLAN.md)** - 12-Phasen-Entwicklungsplan  
- **[Entwickler-Präferenzen](./projectfiles/claude.md)** - Coding-Standards und Regeln

## 📞 Support

Bei Fragen oder Problemen:
1. **Issues** auf GitHub erstellen
2. **Logs** mit `docker-compose logs` prüfen
3. **Health-Check** unter http://localhost:3001/api/health

---

**Version**: 1.0.0  
**Status**: Phase 1 abgeschlossen  
**Nächstes Update**: Nach Abschluss Phase 2
