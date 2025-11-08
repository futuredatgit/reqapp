/**
 * Request Logger Middleware
 * Protokolliert alle HTTP-Anfragen
 */

import type { Request, Response, NextFunction } from 'express';
import { logger } from '../utils/logger';

/**
 * Request Logger Middleware
 */
export const requestLogger = (req: Request, res: Response, next: NextFunction): void => {
  const start = Date.now();
  
  // Request-Start loggen (nur in Development)
  if (process.env.NODE_ENV === 'development') {
    logger.debug('HTTP Request Start', {
      method: req.method,
      url: req.originalUrl,
      ip: req.ip,
      userAgent: req.get('User-Agent')
    });
  }
  
  // Response-Event abfangen
  res.on('finish', () => {
    const duration = Date.now() - start;
    const logLevel = res.statusCode >= 400 ? 'error' : 'info';
    
    // Request-Details sammeln
    const requestData = {
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      duration: `${duration}ms`,
      userAgent: req.get('User-Agent'),
      ip: req.ip,
      referer: req.get('Referer'),
      contentLength: res.get('Content-Length'),
      userId: (req as any).user?.id || 'anonymous'
    };

    // Log-Message erstellen
    const message = `${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`;
    
    logger.log(logLevel, message, requestData);
    
    // Langsame Requests warnen (> 1s)
    if (duration > 1000) {
      logger.warn('Slow Request', {
        ...requestData,
        warning: 'Request took longer than 1 second'
      });
    }
  });
  
  next();
};