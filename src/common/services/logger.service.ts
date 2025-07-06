import { Injectable, LoggerService } from '@nestjs/common';

@Injectable()
export class PrettyLoggerService implements LoggerService {
  private getTimestamp(): string {
    return new Date().toISOString();
  }

  private formatMessage(level: string, message: string, context?: string): string {
    const timestamp = this.getTimestamp();
    const contextStr = context ? `[${context}]` : '';
    
    // Color codes for different log levels
    const colors = {
      log: '\x1b[32m',    // Green
      error: '\x1b[31m',  // Red
      warn: '\x1b[33m',   // Yellow
      debug: '\x1b[36m',  // Cyan
      verbose: '\x1b[35m' // Magenta
    };
    
    const reset = '\x1b[0m';
    const color = colors[level] || colors.log;
    
    return `${color}[${timestamp}] ${level.toUpperCase()}${reset} ${contextStr} ${message}`;
  }

  log(message: string, context?: string): void {
    console.log(this.formatMessage('log', message, context));
  }

  error(message: string, trace?: string, context?: string): void {
    console.error(this.formatMessage('error', message, context));
    if (trace) {
      console.error(`\x1b[31m${trace}\x1b[0m`);
    }
  }

  warn(message: string, context?: string): void {
    console.warn(this.formatMessage('warn', message, context));
  }

  debug(message: string, context?: string): void {
    console.debug(this.formatMessage('debug', message, context));
  }

  verbose(message: string, context?: string): void {
    console.log(this.formatMessage('verbose', message, context));
  }
} 