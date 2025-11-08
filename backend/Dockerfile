FROM node:18-alpine

# Arbeitsverzeichnis setzen
WORKDIR /app

# Package-Dateien kopieren
COPY package*.json ./

# Dependencies installieren
RUN npm ci --only=production

# Prisma CLI installieren
RUN npm install -g prisma

# Source-Code kopieren
COPY . .

# Prisma generieren
RUN npx prisma generate

# TypeScript kompilieren
RUN npm run build

# Port freigeben
EXPOSE 3001

# Health Check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/api/health || exit 1

# Anwendung starten
CMD ["npm", "start"]