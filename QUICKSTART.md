# 🚀 ReqApp - Schnellstart-Anleitung

## ⚡ 5-Minuten-Setup

### 1. Repository klonen & Setup

```bash
git clone <repository-url>
cd reqapp
cp .env.example .env
```

### 2. Environment konfigurieren

Öffne `.env` und setze mindestens diese Werte:

```env
DB_PASSWORD=mysecurepassword123
JWT_SECRET=your_very_long_jwt_secret_at_least_32_characters_long
JWT_REFRESH_SECRET=your_very_long_refresh_secret_at_least_32_chars
ENCRYPTION_KEY=your_32_byte_base64_encoded_encryption_key_here
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=AdminPassword123!
```

### 3. Container starten

```bash
docker-compose up -d
```

### 4. Testen

- Frontend: <http://localhost:3000> 
- Backend Health: <http://localhost:3001/api/health>
- API Docs: <http://localhost:3001/api>

## 🔍 Status prüfen

```bash
# Container-Status
docker-compose ps

# Logs ansehen
docker-compose logs -f

# Datenbank testen
docker-compose exec postgres pg_isready -U reqapp_user -d reqapp
```

## 🛠️ Entwicklung

```bash
# Backend lokal entwickeln
cd backend && npm install && npm run dev

# Frontend lokal entwickeln  
cd frontend && npm install && npm start
```

## 🆘 Probleme?

```bash
# Alles neu starten
docker-compose down
docker-compose up --build -d

# Ports prüfen
lsof -i :3000
lsof -i :3001  
lsof -i :5432
```

---

**Ready to go!** 🎉 Phase 1 ist abgeschlossen - die Grundstruktur läuft!