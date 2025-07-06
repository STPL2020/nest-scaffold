import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DatabaseService } from '../database/database.service';

@ApiTags('health')
@Controller('health')
export class HealthController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  @ApiOperation({ summary: 'Get application health status' })
  @ApiResponse({ status: 200, description: 'Application is healthy' })
  async getHealth() {
    const dbStats = await this.databaseService.getStats();
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: {
        connected: dbStats.isConnected,
        database: dbStats.database,
        entities: dbStats.entities,
      },
      uptime: process.uptime(),
    };
  }

  @Get('db')
  @ApiOperation({ summary: 'Get database health status' })
  @ApiResponse({ status: 200, description: 'Database health information' })
  async getDatabaseHealth() {
    const isConnected = await this.databaseService.isConnected();
    
    return {
      status: isConnected ? 'ok' : 'error',
      connected: isConnected,
      timestamp: new Date().toISOString(),
    };
  }
} 