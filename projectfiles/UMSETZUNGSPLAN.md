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

## 💻 Entwicklungsumgebung-Setup

### ✅ Voraussetzungen-Check
**Status der aktuellen Umgebung (aktualisiert 8. Nov 2025):**

- ✅ **Docker**: Version 28.5.1 installiert und funktionsfähig
- ✅ **WSL2**: Version 2.6.1.0 mit Debian (Running) und Ubuntu-22.04 (Stopped) verfügbar
- ✅ **Git**: Version 2.51.2 installiert
- ✅ **Node.js**: Version 20.19.5 LTS erfolgreich installiert in Ubuntu WSL
- ✅ **NPM**: Version 10.8.2 funktionsfähig
- ✅ **VS Code**: Version 1.105.1 installiert
- ❌ **Yarn**: Nicht installiert (aber optional - NPM reicht aus)
- ❓ **VS Code Dev Containers Extension**: Status unbekannt

### 🔧 Noch erforderliche Installation/Konfiguration

#### 1. VS Code Extensions installieren (empfohlen)

```bash
# Erforderliche Extensions installieren
code --install-extension ms-vscode-remote.remote-containers
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension Prisma.prisma
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
```

#### 2. Yarn Installation (optional)

```bash
# Option A: Über APT (empfohlen)
sudo apt update
curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | sudo tee /usr/share/keyrings/yarnkey.gpg >/dev/null
echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install yarn

# Option B: NPM verwenden (Yarn ist optional)
# Projekt kann komplett mit NPM entwickelt werden
```

#### 3. Projektverzeichnis erstellen

```bash
# In Ubuntu-22.04 WSL
cd /home/$USER
mkdir -p projects/konzept-app
cd projects/konzept-app
```

### 🐳 Docker-Entwicklungsumgebung

#### Warum WSL2 + Docker + Dev Containers?
- **Konsistenz**: Identische Umgebung auf allen Entwicklungsrechnern
- **Isolierung**: Saubere Dependency-Trennung
- **Performance**: WSL2 native Linux-Performance
- **Portabilität**: Container laufen überall identisch

#### Dev Container Konfiguration (geplant)
```json
// .devcontainer/devcontainer.json
{
  "name": "ReqApp Dev Environment",
  "dockerComposeFile": "../docker-compose.dev.yml",
  "service": "app",
  "workspaceFolder": "/workspace",
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-typescript-language-features",
        "Prisma.prisma",
        "bradlc.vscode-tailwindcss"
      ]
    }
  }
}
```

---

## � Schritt-für-Schritt-Umsetzungsanleitung

### 📋 Vorbereitung und Setup

#### Schritt 1: Entwicklungsumgebung einrichten

**1.1 WSL2 und Ubuntu vorbereiten**
```bash
# WSL Ubuntu-22.04 starten
wsl -d Ubuntu-22.04

# System aktualisieren
sudo apt update && sudo apt upgrade -y

# Node.js 20 LTS installieren
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Yarn installieren (optional, aber empfohlen)
npm install -g yarn

# Verifikation
node --version  # Sollte v20.x.x zeigen
npm --version   # Sollte 10.x.x zeigen
```

**1.2 VS Code Extensions installieren**
```bash
# Erforderliche Extensions
code --install-extension ms-vscode-remote.remote-containers
code --install-extension ms-azuretools.vscode-docker
code --install-extension ms-vscode-remote.remote-wsl
code --install-extension ms-vscode.vscode-typescript-next
code --install-extension Prisma.prisma
code --install-extension bradlc.vscode-tailwindcss
code --install-extension esbenp.prettier-vscode
```

**1.3 Projektverzeichnis erstellen**
```bash
# In WSL Ubuntu
cd /home/$USER
mkdir -p projects/konzept-app
cd projects/konzept-app

# Git Repository initialisieren
git init
git config user.name "Dein Name"
git config user.email "deine.email@domain.com"
```

#### Schritt 2: Projekt-Grundstruktur aufbauen

**2.1 Ordnerstruktur erstellen**
```bash
# Hauptordner
mkdir -p {backend,frontend,database,nginx,docs}
mkdir -p .devcontainer
mkdir -p database/{migrations,seeds}
mkdir -p backend/{src,tests}
mkdir -p frontend/{src,public}

# Backend Unterordner
mkdir -p backend/src/{config,middleware,models,routes,services,controllers,utils,scripts}
mkdir -p backend/src/{types,interfaces}

# Frontend Unterordner  
mkdir -p frontend/src/{components,contexts,hooks,services,utils,types,pages,assets}
mkdir -p frontend/src/components/{common,auth,projects,chat,repository,settings,admin}
```

**2.2 Package-Management Setup**
```bash
# Backend Package.json erstellen
cd backend
npm init -y
npm install express cors helmet bcryptjs jsonwebtoken prisma
npm install -D typescript @types/node @types/express ts-node nodemon
npm install -D @types/bcryptjs @types/jsonwebtoken

# Frontend Package.json erstellen  
cd ../frontend
npm create react-app . --template typescript
npm install @mui/material @emotion/react @emotion/styled
npm install axios react-router-dom recharts
npm install -D @types/node

cd .. # zurück zum root
```

#### Schritt 3: Docker-Umgebung konfigurieren

**3.1 Docker Compose Setup**
```yaml
# docker-compose.yml erstellen
version: '3.8'
services:
  database:
    image: postgres:15
    environment:
      POSTGRES_DB: reqapp
      POSTGRES_USER: reqapp_user  
      POSTGRES_PASSWORD: secure_password
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./database/init.sql:/docker-entrypoint-initdb.d/init.sql
  
  backend:
    build: ./backend
    ports:
      - "3001:3001"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://reqapp_user:secure_password@database:5432/reqapp
    depends_on:
      - database
    volumes:
      - ./backend:/app
      - /app/node_modules
  
  frontend:
    build: ./frontend  
    ports:
      - "3000:3000"
    volumes:
      - ./frontend:/app
      - /app/node_modules

volumes:
  postgres_data:
```

**3.2 Environment-Dateien erstellen**
```bash
# .env.example erstellen
cat > .env.example << 'EOF'
# Database
DATABASE_URL=postgresql://reqapp_user:secure_password@localhost:5432/reqapp

# JWT
JWT_SECRET=your_super_secret_jwt_key_here_change_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_key_here
JWT_EXPIRES_IN=15m
JWT_REFRESH_EXPIRES_IN=7d

# Encryption
ENCRYPTION_KEY=your_32_character_encryption_key

# GitHub  
GITHUB_CLIENT_ID=your_github_app_id
GITHUB_CLIENT_SECRET=your_github_app_secret

# LLM APIs (optional für Testing)
OPENAI_API_KEY=sk-your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
MISTRAL_API_KEY=your_mistral_key

# Server
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000
EOF

# Echte .env erstellen (nicht in Git committen!)
cp .env.example .env
```

#### Schritt 4: Datenbank-Design implementieren

**4.1 Prisma Schema erstellen**

```bash
# Im backend Verzeichnis
cd backend
npx prisma init
```

**4.2 Schema.prisma konfigurieren**

```prisma
// backend/prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id              String   @id @default(cuid())
  email           String   @unique
  passwordHash    String   @map("password_hash")
  firstName       String?  @map("first_name")
  lastName        String?  @map("last_name")
  role            Role     @default(USER)
  isActive        Boolean  @default(true) @map("is_active")
  githubToken     String?  @map("github_token") // encrypted
  lastLogin       DateTime? @map("last_login")
  createdAt       DateTime @default(now()) @map("created_at")
  updatedAt       DateTime @updatedAt @map("updated_at")
  createdById     String?  @map("created_by")
  
  // Relations
  createdBy       User? @relation("UserCreatedBy", fields: [createdById], references: [id])
  createdUsers    User[] @relation("UserCreatedBy")
  settings        UserSettings?
  projects        Project[]
  llmConfigs      LLMConfiguration[]
  usageLogs       LLMUsageLog[]
  costTracking    CostTracking[]
  auditLogs       AuditLog[]
  
  @@map("users")
}

enum Role {
  USER
  ADMIN
}
```

**4.3 Migrations erstellen und ausführen**

```bash
# Erste Migration erstellen
npx prisma migrate dev --name init

# Prisma Client generieren
npx prisma generate
```

#### Schritt 5: Backend-Grundgerüst entwickeln

**5.1 TypeScript Konfiguration**

```json
// backend/tsconfig.json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "lib": ["ES2020"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "tests"]
}
```

**5.2 Express Server Setup**

```typescript
// backend/src/server.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import projectRoutes from './routes/projects';

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);

// Health Check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

#### Schritt 6: Authentication implementieren

**6.1 JWT Service**

```typescript
// backend/src/services/authService.ts
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export class AuthService {
  private JWT_SECRET = process.env.JWT_SECRET!;
  private JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;
  
  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }
  
  async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
  
  generateTokens(userId: string, email: string, role: string) {
    const accessToken = jwt.sign(
      { userId, email, role },
      this.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN || '15m' }
    );
    
    const refreshToken = jwt.sign(
      { userId },
      this.JWT_REFRESH_SECRET,
      { expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '7d' }
    );
    
    return { accessToken, refreshToken };
  }
  
  async register(email: string, password: string, firstName?: string, lastName?: string) {
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('Email bereits registriert');
    }
    
    const passwordHash = await this.hashPassword(password);
    
    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName
      }
    });
    
    const tokens = this.generateTokens(user.id, user.email, user.role);
    
    return { user, tokens };
  }
}
```

#### Schritt 7: Frontend-Grundgerüst

**7.1 React Context für Authentication**

```typescript
// frontend/src/contexts/AuthContext.tsx
import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { authService } from '../services/authService';

interface User {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role: 'USER' | 'ADMIN';
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (userData: any) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    isLoading: true
  });
  
  // Implementation...
  
  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
```

#### Schritt 8: Entwicklungsumgebung testen

**8.1 Docker Container starten**

```bash
# Container bauen und starten
docker-compose up --build -d

# Logs verfolgen
docker-compose logs -f

# Container-Status prüfen
docker-compose ps
```

**8.2 Datenbank-Verbindung testen**

```bash
# Backend-Container betreten
docker-compose exec backend sh

# Prisma Studio starten (für DB-Inspektion)
npx prisma studio
```

**8.3 API-Endpunkte testen**

```bash
# Health Check
curl http://localhost:3001/health

# Registration testen
curl -X POST http://localhost:3001/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"SecurePass123!"}'
```

#### Schritt 9: Dev Container Setup (Optional, aber empfohlen)

**9.1 .devcontainer/devcontainer.json erstellen**

```json
{
  "name": "ReqApp Development",
  "dockerComposeFile": "../docker-compose.yml",
  "service": "backend",
  "workspaceFolder": "/app",
  "shutdownAction": "stopCompose",
  
  "customizations": {
    "vscode": {
      "extensions": [
        "ms-vscode.vscode-typescript-next",
        "Prisma.prisma",
        "bradlc.vscode-tailwindcss",
        "esbenp.prettier-vscode",
        "ms-vscode.vscode-json"
      ],
      "settings": {
        "typescript.preferences.importModuleSpecifier": "relative"
      }
    }
  },
  
  "forwardPorts": [3000, 3001, 5432],
  "postCreateCommand": "npm install"
}
```

**9.2 Container öffnen**

```bash
# VS Code mit Dev Container öffnen
code .
# Dann: Ctrl+Shift+P -> "Dev Containers: Reopen in Container"
```

### 🔄 Iterative Entwicklungs-Workflows

#### Workflow 1: Feature-Entwicklung

**Typischer Entwicklungszyklus:**
```bash
# 1. Feature Branch erstellen
git checkout -b feature/user-authentication

# 2. Backend zuerst (TDD-Approach)
# - Models definieren (Prisma Schema)
# - Services implementieren  
# - Controller erstellen
# - API-Tests schreiben

# 3. Frontend entwickeln
# - Types/Interfaces definieren
# - Components erstellen
# - Integration mit Backend API
# - Component-Tests

# 4. E2E-Tests
# - User Journey testen
# - API-Integration verifizieren

# 5. Code Review & Merge
git push origin feature/user-authentication
# Pull Request erstellen
```

#### Workflow 2: Datenbank-Änderungen

```bash
# Schema ändern
nano backend/prisma/schema.prisma

# Migration erstellen
npx prisma migrate dev --name add_user_settings

# Client neu generieren
npx prisma generate

# Types für Frontend aktualisieren
npm run generate:types
```

#### Workflow 3: LLM-Integration testen

```bash
# Environment-Variablen für Tests
export OPENAI_API_KEY=sk-test...
export ANTHROPIC_API_KEY=test...

# LLM-Service isoliert testen
npm run test:llm

# Mock-Responses für Frontend-Tests
npm run test:frontend
```

### 🧪 Testing-Strategie

#### Unit Tests (Backend)

```typescript
// backend/tests/services/authService.test.ts
import { AuthService } from '../../src/services/authService';

describe('AuthService', () => {
  let authService: AuthService;
  
  beforeEach(() => {
    authService = new AuthService();
  });
  
  it('should hash password correctly', async () => {
    const password = 'testPassword123!';
    const hash = await authService.hashPassword(password);
    
    expect(hash).not.toBe(password);
    expect(hash.length).toBeGreaterThan(50);
  });
  
  it('should compare passwords correctly', async () => {
    const password = 'testPassword123!';
    const hash = await authService.hashPassword(password);
    
    const isValid = await authService.comparePassword(password, hash);
    expect(isValid).toBe(true);
    
    const isInvalid = await authService.comparePassword('wrongPassword', hash);
    expect(isInvalid).toBe(false);
  });
});
```

#### API-Tests

```typescript
// backend/tests/routes/auth.test.ts
import request from 'supertest';
import app from '../../src/server';

describe('Auth API', () => {
  it('POST /api/auth/register should create new user', async () => {
    const userData = {
      email: 'test@example.com',
      password: 'SecurePass123!',
      firstName: 'Test',
      lastName: 'User'
    };
    
    const response = await request(app)
      .post('/api/auth/register')
      .send(userData)
      .expect(201);
    
    expect(response.body.user.email).toBe(userData.email);
    expect(response.body.tokens.accessToken).toBeDefined();
  });
});
```

#### Frontend Component Tests

```typescript
// frontend/src/components/auth/Login.test.tsx
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Login } from './Login';
import { AuthProvider } from '../../contexts/AuthContext';

describe('Login Component', () => {
  it('should submit login form', async () => {
    render(
      <AuthProvider>
        <Login />
      </AuthProvider>
    );
    
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'test@example.com' }
    });
    
    fireEvent.change(screen.getByLabelText('Passwort'), {
      target: { value: 'password123' }
    });
    
    fireEvent.click(screen.getByRole('button', { name: 'Anmelden' }));
    
    await waitFor(() => {
      expect(screen.getByText('Willkommen zurück!')).toBeInTheDocument();
    });
  });
});
```

### 🚀 Deployment-Vorbereitung

#### Production Docker Setup

```dockerfile
# backend/Dockerfile.prod
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production && npm cache clean --force

FROM node:20-alpine AS runtime  
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "start:prod"]
```

#### Nginx Konfiguration

```nginx
# nginx/nginx.conf
upstream backend {
    server backend:3001;
}

server {
    listen 80;
    server_name reqapp.example.com;
    
    # Frontend Static Files
    location / {
        root /usr/share/nginx/html;
        try_files $uri $uri/ /index.html;
    }
    
    # API Proxy
    location /api/ {
        proxy_pass http://backend;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # WebSocket Support für Chat
    location /ws/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

### 📊 Monitoring und Logging

#### Logging Setup

```typescript
// backend/src/utils/logger.ts
import winston from 'winston';

export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'reqapp-backend' },
  transports: [
    new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
    new winston.transports.File({ filename: 'logs/combined.log' }),
    new winston.transports.Console({
      format: winston.format.simple()
    })
  ]
});
```

#### Health Checks

```typescript
// backend/src/routes/health.ts
import { Router } from 'express';
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get('/health', async (req, res) => {
  try {
    // Datenbank-Check
    await prisma.$queryRaw`SELECT 1`;
    
    // Weitere Service-Checks hier...
    
    res.json({
      status: 'OK',
      timestamp: new Date().toISOString(),
      services: {
        database: 'healthy',
        api: 'healthy'
      }
    });
  } catch (error) {
    res.status(500).json({
      status: 'ERROR',
      error: error.message
    });
  }
});
```

### 🎯 Erfolgsmessung

#### Definition of Done (DoD) pro Phase

**Phase 1-3 (Foundation):**
- [ ] Docker-Setup funktioniert lokal
- [ ] Datenbank-Schema komplett implementiert
- [ ] Authentication API vollständig funktional
- [ ] JWT-Token-Handling sicher implementiert
- [ ] Tests schreiben und bestehen (>80% Coverage)

**Phase 4-6 (Core Features):**
- [ ] User-Management API komplett
- [ ] GitHub-Integration funktional (Repository erstellen, Dateien lesen/schreiben)
- [ ] Mindestens ein LLM-Provider integriert (OpenAI)
- [ ] Kosten-Tracking implementiert
- [ ] Error-Handling und Logging komplett

**Phase 7-9 (Frontend):**
- [ ] React-App funktional mit allen Core-Features
- [ ] Responsive Design (Mobile + Desktop)
- [ ] Chat-Interface mit Streaming-Support
- [ ] Repository-Browser komplett
- [ ] User-Experience getestet und optimiert

**Phase 10-12 (Production-Ready):**
- [ ] Admin-Dashboard vollständig
- [ ] Multi-LLM-Support
- [ ] Production-Deployment konfiguriert
- [ ] Monitoring und Alerting implementiert
- [ ] Dokumentation komplett

---

## �📅 Implementierungs-Roadmap (12 Phasen)

### **Phase 1: Projekt-Setup und Infrastructure** ⏳

**Dauer**: 2-3 Tage  
**Status**: In Bearbeitung  

#### Aufgaben

- [x] Projektverzeichnis und Ordnerstruktur erstellen
- [ ] Docker-Compose-Setup mit PostgreSQL, Backend, Frontend
- [ ] Package.json für Backend und Frontend
- [ ] TypeScript-Konfiguration
- [ ] ESLint + Prettier Setup
- [ ] Git Repository initialisieren

#### Deliverables

```text
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

#### Aufgaben

- [ ] User-Profilverwaltung (CRUD)
- [ ] User-Settings (Sprache, Theme, Timezone)
- [ ] LLM-Konfigurationen (CRUD mit Verschlüsselung)
- [ ] LLM-Verbindungstest
- [ ] Input-Validierung und Sanitisierung

#### API-Endpunkte

```text
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

## ⚡ Sofortige Nächste Schritte

### 🎯 Diese Woche (8-14. November 2025)

**Tag 1-2: Entwicklungsumgebung komplettieren**

```bash
# 1. Node.js in WSL installieren
wsl -d Ubuntu-22.04
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Projektstruktur erstellen
mkdir -p /home/$USER/projects/konzept-app
cd /home/$USER/projects/konzept-app

# 3. Docker-Compose und Grundstruktur aufbauen
# (siehe detaillierte Schritte oben)
```

**Tag 3-4: Datenbank-Schema & Backend-Grundgerüst**

- [ ] Prisma-Schema vollständig implementieren (alle 15+ Tabellen)
- [ ] Erste Migrations erstellen und testen
- [ ] Express-Server mit Basis-Middleware aufsetzen
- [ ] Health-Check Endpoint implementieren

**Tag 5-7: Authentication vollständig**

- [ ] JWT-Service implementieren und testen
- [ ] Registration/Login/Logout API komplett
- [ ] Passwort-Hashing und Verschlüsselung
- [ ] RBAC-Middleware (User/Admin-Rollen)
- [ ] API-Tests für Authentication

### 🎯 Nächste Woche (15-21. November 2025)

**User-Management & GitHub-Integration**

- [ ] User-Settings API implementieren
- [ ] LLM-Configuration CRUD (mit Verschlüsselung)
- [ ] GitHub-Service für Repository-Operationen
- [ ] Erste LLM-Provider-Integration (OpenAI)

### 🎯 Woche 3 (22-28. November 2025)

**Frontend-Grundgerüst**

- [ ] React-App mit TypeScript Setup
- [ ] Authentication-Context und Protected Routes
- [ ] Basis-UI-Komponenten (Material-UI/Tailwind)
- [ ] Login/Registration Forms
- [ ] User-Dashboard (Projekte-Liste)

### 📋 Kritische Erfolgs-Faktoren

#### ✅ Was bereits vorhanden ist

- ✅ **Docker** (v28.5.1) funktionsfähig
- ✅ **WSL2** mit Ubuntu-22.04 verfügbar  
- ✅ **Git** für Versionskontrolle
- ✅ **Projektspezifikation** vollständig dokumentiert
- ✅ **Architektur-Design** durchdacht

#### ❗ Was sofort angegangen werden muss

- ❗ **Node.js in WSL installieren** (blockiert Backend-Entwicklung)
- ❗ **VS Code Dev Container Extension** installieren
- ❗ **PostgreSQL-Schema** komplett implementieren
- ❗ **Environment-Variablen** konfigurieren (.env-Dateien)

#### 🎯 MVP-Ziel (Ende November 2025)

**Funktionsfähige Kern-Features:**

- Benutzer-Registration und -Login
- Projekt erstellen → GitHub-Repository automatisch angelegt  
- Einfacher Chat mit OpenAI-Integration
- Repository-Dateien browsen und bearbeiten
- Kosten-Tracking für LLM-Nutzung
- Admin kann Benutzer verwalten

#### 🚀 Deployment-Ziel (Mitte Dezember 2025)

**Production-Ready System:**

- Multi-LLM-Provider-Support
- Vollständiges Admin-Dashboard
- SSL/HTTPS-Konfiguration
- Monitoring und Logging
- Automatisierte Backups
- Dokumentation komplett

### 💡 Empfohlene Entwicklungs-Reihenfolge

1. **Foundation First**: Database → Authentication → User Management
2. **API-First Approach**: Backend-APIs vor Frontend-Development
3. **Iterative Integration**: Ein LLM-Provider vor Multi-Provider-Support
4. **Testing Parallel**: Tests während Development, nicht nachgelagert
5. **Documentation Continuous**: README und API-Docs aktuell halten

---

**Erstellt**: 8. November 2025  
**Version**: 1.1 - Erweitert mit detaillierter Schritt-für-Schritt-Anleitung  
**Nächstes Update**: Nach Abschluss der Entwicklungsumgebung (ca. 12. November 2025)