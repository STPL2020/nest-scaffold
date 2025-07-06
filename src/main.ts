
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { PrettyLoggerService } from './common/services/logger.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new PrettyLoggerService(),
  });
  const port = process.env.PORT || 3000;

  // Enable validation pipes
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));

  // Enable logging interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  // Enable global exception filter to catch 404s and other unhandled errors
  app.useGlobalFilters(new GlobalExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('Nest Scaffold API') 
    .setDescription('Auto-scaffolded API with query support and comprehensive documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users', 'User management endpoints')
    .addTag('posts', 'Post management endpoints')
    .addTag('health', 'Health check endpoints')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(port);
  // Log startup message using the logger instance directly
  const logger = new PrettyLoggerService();
  logger.log(`🚀 Application is running on: http://localhost:${port}`, 'Bootstrap');
  logger.log(`📚 Swagger documentation available at: http://localhost:${port}/api`, 'Bootstrap');
}
bootstrap();
