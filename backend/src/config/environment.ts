/**
 * Environment Configuration
 * Zentrale Konfiguration für alle Umgebungsvariablen
 */

import dotenv from 'dotenv';

// .env Datei laden
dotenv.config();

/**
 * Interface für die Anwendungskonfiguration
 */
export interface IConfig {
  nodeEnv: string;
  port: number;
  databaseUrl: string;
  jwt: {
    secret: string;
    refreshSecret: string;
    accessTokenExpiry: string;
    refreshTokenExpiry: string;
  };
  encryption: {
    key: string;
    algorithm: string;
  };
  admin: {
    email: string;
    password: string;
  };
  smtp?: {
    host: string;
    port: number;
    user: string;
    password: string;
    from: string;
  };
  github?: {
    clientId: string;
    clientSecret: string;
  };
  rateLimits: {
    general: number;
    auth: number;
    llm: number;
  };
}

/**
 * Validiert erforderliche Umgebungsvariablen
 */
const validateRequiredEnvVars = (): void => {
  const required = [
    'DB_PASSWORD',
    'JWT_SECRET',
    'JWT_REFRESH_SECRET',
    'ENCRYPTION_KEY',
    'ADMIN_EMAIL',
    'ADMIN_PASSWORD'
  ];

  const missing = required.filter(key => !process.env[key]);
  
  if (missing.length > 0) {
    throw new Error(`❌ Fehlende Umgebungsvariablen: ${missing.join(', ')}`);
  }
};

// Validierung durchführen
validateRequiredEnvVars();

/**
 * Anwendungskonfiguration
 */
export const config: IConfig = {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3001', 10),
  
  databaseUrl: process.env.DATABASE_URL || 
    `postgresql://reqapp_user:${process.env.DB_PASSWORD}@localhost:5432/reqapp`,
  
  jwt: {
    secret: process.env.JWT_SECRET!,
    refreshSecret: process.env.JWT_REFRESH_SECRET!,
    accessTokenExpiry: '15m',
    refreshTokenExpiry: '7d'
  },
  
  encryption: {
    key: process.env.ENCRYPTION_KEY!,
    algorithm: 'aes-256-gcm'
  },
  
  admin: {
    email: process.env.ADMIN_EMAIL!,
    password: process.env.ADMIN_PASSWORD!
  },
  
  // Optional: SMTP-Konfiguration
  smtp: process.env.SMTP_HOST ? {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587', 10),
    user: process.env.SMTP_USER!,
    password: process.env.SMTP_PASSWORD!,
    from: process.env.SMTP_FROM!
  } : undefined,
  
  // Optional: GitHub-Konfiguration
  github: process.env.GITHUB_CLIENT_ID ? {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET!
  } : undefined,
  
  rateLimits: {
    general: 100, // 100 Requests pro Minute
    auth: 5,      // 5 Auth-Versuche pro 15 Minuten
    llm: 20       // 20 LLM-Anfragen pro Minute
  }
};

/**
 * Prüft ob die Anwendung im Production-Modus läuft
 */
export const isProduction = (): boolean => config.nodeEnv === 'production';

/**
 * Prüft ob die Anwendung im Development-Modus läuft
 */
export const isDevelopment = (): boolean => config.nodeEnv === 'development';

/**
 * Prüft ob die Anwendung im Test-Modus läuft
 */
export const isTest = (): boolean => config.nodeEnv === 'test';