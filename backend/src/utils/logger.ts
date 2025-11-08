/**
 * Winston Logger Konfiguration
 * Strukturierte Logs für Development und Production
 */

import winston from 'winston';
import { config } from '../config/environment';

// Log-Level basierend auf Umgebung
const logLevel = config.nodeEnv === 'production' ? 'info' : 'debug';

// Custom Log Format
const logFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.prettyPrint()
);

// Console Format für Development
const consoleFormat = winston.format.combine(
  winston.format.colorize(),
  winston.format.timestamp({
    format: 'HH:mm:ss'
  }),
  winston.format.printf(({ timestamp, level, message, ...meta }) => {
    let log = `${timestamp} [${level}]: ${message}`;
    
    // Meta-Informationen anhängen
    if (Object.keys(meta).length > 0) {
      log += ` ${JSON.stringify(meta, null, 2)}`;
    }
    
    return log;
  })
);

// Winston Logger erstellen
export const logger = winston.createLogger({
  level: logLevel,
  format: logFormat,
  defaultMeta: { 
    service: 'reqapp-backend',
    version: process.env.npm_package_version || '1.0.0'
  },
  transports: [
    // Console Transport für Development
    new winston.transports.Console({
      format: config.nodeEnv === 'production' ? logFormat : consoleFormat
    }),
    
    // File Transports für Production
    ...(config.nodeEnv === 'production' ? [
      new winston.transports.File({
        filename: 'logs/error.log',
        level: 'error',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
      new winston.transports.File({
        filename: 'logs/combined.log',
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      })
    ] : [])
  ],
  
  // Unhandled Exceptions
  exceptionHandlers: [
    new winston.transports.Console({
      format: consoleFormat
    })
  ],
  
  // Unhandled Promise Rejections
  rejectionHandlers: [
    new winston.transports.Console({
      format: consoleFormat
    })
  ]
});

/**
 * Request Logger für Express Middleware
 */
export const createRequestLogger = () => {
  return (req: any, res: any, next: any) => {
    const start = Date.now();
    
    // Response-Event abfangen
    res.on('finish', () => {
      const duration = Date.now() - start;
      const logLevel = res.statusCode >= 400 ? 'error' : 'info';
      
      logger.log(logLevel, 'HTTP Request', {
        method: req.method,
        url: req.originalUrl,
        statusCode: res.statusCode,
        duration: `${duration}ms`,
        userAgent: req.get('User-Agent'),
        ip: req.ip,
        userId: req.user?.id || 'anonymous'
      });
    });
    
    next();
  };
};

/**
 * Error Logger Utility
 */
export const logError = (error: Error, context?: Record<string, any>): void => {
  logger.error('Application Error', {
    message: error.message,
    stack: error.stack,
    name: error.name,
    ...context
  });
};

/**
 * Audit Logger für wichtige Aktionen
 */
export const auditLog = (action: string, userId?: string, details?: Record<string, any>): void => {
  logger.info('Audit Log', {
    action,
    userId: userId || 'system',
    timestamp: new Date().toISOString(),
    ...details
  });
};