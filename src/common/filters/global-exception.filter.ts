import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { PrettyLoggerService } from '../services/logger.service';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new PrettyLoggerService();

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { method, url, ip, headers } = request;
    const userAgent = headers['user-agent'] || '';

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      message = exception.message;
    } else if (exception instanceof Error) {
      message = exception.message;
    }

    // Log the error with appropriate emoji
    let statusEmoji = '❌';
    if (status === 404) {
      statusEmoji = '🔍';
      this.logger.warn(
        `${statusEmoji} ${method} ${url} - ${status} - Route not found - ${ip} - ${userAgent}`,
        'NotFound'
      );
    } else if (status >= 400 && status < 500) {
      statusEmoji = '⚠️';
      this.logger.warn(
        `${statusEmoji} ${method} ${url} - ${status} - ${message} - ${ip} - ${userAgent}`,
        'ClientError'
      );
    } else {
      this.logger.error(
        `${statusEmoji} ${method} ${url} - ${status} - ${message} - ${ip} - ${userAgent}`,
        exception instanceof Error ? exception.stack : undefined,
        'ServerError'
      );
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: status === 404 ? 'Route not found' : message,
    });
  }
} 