/**
 * ReqApp Server - Haupteinstiegspunkt
 * Startet den Express-Server mit allen erforderlichen Middlewares
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { config } from './config/environment';
import { logger } from './utils/logger';
import { errorHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/requestLogger';

// Express App initialisieren
const app = express();

// Security Middleware
app.use(helmet());
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://yourdomain.com'] 
    : ['http://localhost:3000'],
  credentials: true
}));

// Body Parser Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request Logging
app.use(requestLogger);

// Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || '1.0.0'
  });
});

// API Routes (werden in späteren Phasen hinzugefügt)
app.get('/api', (req, res) => {
  res.json({
    message: 'ReqApp API v1.0',
    status: 'active',
    documentation: '/api/docs'
  });
});

// 404 Handler
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
    method: req.method
  });
});

// Error Handler (muss am Ende stehen)
app.use(errorHandler);

// Server starten
const PORT = config.port || 3001;

const startServer = async (): Promise<void> => {
  try {
    app.listen(PORT, () => {
      logger.info(`🚀 ReqApp Backend Server läuft auf Port ${PORT}`);
      logger.info(`📍 Health Check: http://localhost:${PORT}/api/health`);
      logger.info(`🌍 Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    logger.error('❌ Fehler beim Starten des Servers:', error);
    process.exit(1);
  }
};

// Graceful Shutdown
process.on('SIGTERM', () => {
  logger.info('🛑 SIGTERM erhalten - Server wird heruntergefahren');
  process.exit(0);
});

process.on('SIGINT', () => {
  logger.info('🛑 SIGINT erhalten - Server wird heruntergefahren');
  process.exit(0);
});

// Server starten
void startServer();