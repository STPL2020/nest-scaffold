import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  import { Request, Response } from 'express';
  import { PrettyLoggerService } from '../services/logger.service';
  
  @Injectable()
  export class LoggingInterceptor implements NestInterceptor {
    private readonly logger = new PrettyLoggerService();
  
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest<Request>();
      const response = context.switchToHttp().getResponse<Response>();
      const { method, url, ip, headers } = request;
      const userAgent = headers['user-agent'] || '';
      const startTime = Date.now();
  
      // Log the incoming request
      this.logger.log(
        `🚀 ${method} ${url} - ${ip} - ${userAgent}`,
        'Request'
      );
  
      return next.handle().pipe(
        tap({
          next: (data) => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            const statusCode = response.statusCode;
  
            // Determine emoji based on status code
            let statusEmoji = '✅';
            if (statusCode >= 400 && statusCode < 500) {
              statusEmoji = '⚠️';
            } else if (statusCode >= 500) {
              statusEmoji = '❌';
            }
  
            // Log the response
            this.logger.log(
              `${statusEmoji} ${method} ${url} - ${statusCode} - ${responseTime}ms`,
              'Response'
            );
          },
          error: (error) => {
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            const statusCode = error.status || 500;
  
            this.logger.error(
              `❌ ${method} ${url} - ${statusCode} - ${responseTime}ms - ${error.message}`,
              error.stack,
              'Error'
            );
          },
        })
      );
    }
  } 