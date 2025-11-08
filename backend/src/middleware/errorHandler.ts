/**
 * Globaler Error Handler
 * Behandelt alle Fehler in der Express-Anwendung
 */

import type { Request, Response, NextFunction } from 'express';
import { logger, logError } from '../utils/logger';
import { config } from '../config/environment';

/**
 * Custom Error Klassen
 */
export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode = 500, isOperational = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class UnauthorizedError extends AppError {
  constructor(message = 'Nicht authentifiziert') {
    super(message, 401);
  }
}

export class ForbiddenError extends AppError {
  constructor(message = 'Keine Berechtigung') {
    super(message, 403);
  }
}

export class NotFoundError extends AppError {
  constructor(message = 'Ressource nicht gefunden') {
    super(message, 404);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(message, 409);
  }
}

export class RateLimitError extends AppError {
  constructor(message = 'Zu viele Anfragen') {
    super(message, 429);
  }
}

/**
 * Error Response Interface
 */
interface IErrorResponse {
  error: {
    message: string;
    code?: string;
    statusCode: number;
    timestamp: string;
    path: string;
    method: string;
    stack?: string;
    details?: any;
  };
}

/**
 * Hauptfehler-Handler Middleware
 */
export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  
  // Fehler loggen
  logError(err, {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    userId: (req as any).user?.id,
    body: req.body,
    params: req.params,
    query: req.query
  });

  // Standardwerte
  let statusCode = 500;
  let message = 'Interner Server-Fehler';
  let details: any;

  // AppError behandeln
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  // Prisma Fehler behandeln
  else if (err.name === 'PrismaClientKnownRequestError') {
    const prismaError = err as any;
    
    switch (prismaError.code) {
      case 'P2002':
        statusCode = 409;
        message = 'Datenkonflikt - Eintrag existiert bereits';
        break;
      case 'P2025':
        statusCode = 404;
        message = 'Datensatz nicht gefunden';
        break;
      default:
        statusCode = 500;
        message = 'Datenbankfehler';
        details = { code: prismaError.code };
    }
  }
  // JWT Fehler behandeln
  else if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Ungültiges Token';
  }
  else if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token abgelaufen';
  }
  // Validation Fehler behandeln
  else if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
    details = (err as any).details;
  }
  // Syntax Fehler behandeln
  else if (err instanceof SyntaxError) {
    statusCode = 400;
    message = 'Ungültiges JSON-Format';
  }

  // Error Response erstellen
  const errorResponse: IErrorResponse = {
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      ...(details && { details }),
      // Stack-Trace nur in Development zeigen
      ...(config.nodeEnv === 'development' && { stack: err.stack })
    }
  };

  // Response senden
  return res.status(statusCode).json(errorResponse);
};

/**
 * 404 Handler für unbekannte Routen
 */
export const notFoundHandler = (req: Request, res: Response): Response => {
  const error: IErrorResponse = {
    error: {
      message: `Route ${req.originalUrl} nicht gefunden`,
      statusCode: 404,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  };

  logger.warn('404 Not Found', {
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  return res.status(404).json(error);
};

/**
 * Async Handler Wrapper
 * Fängt Fehler in async Route-Handlern ab
 */
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};