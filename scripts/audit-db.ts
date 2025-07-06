#!/usr/bin/env ts-node

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { DatabaseService } from '../src/database/database.service';

async function initDatabase() {
  console.log('🚀 Auditing database...');
  
  const app = await NestFactory.createApplicationContext(AppModule);
  const databaseService = app.get(DatabaseService);

  try {
    // Check if database is connected
    const isConnected = await databaseService.isConnected();
    console.log(`📊 Database connected: ${isConnected}`);

    if (isConnected) {
      // Get database stats
      const stats = await databaseService.getStats();
      console.log('📈 Database Statistics:');
      console.log(`   Database: ${stats.database}`);
      console.log(`   Entities: ${stats.entities.join(', ')}`);

      // Get table counts
      for (const entity of stats.entities) {
        const count = await databaseService.getTableCount(entity.toLowerCase());
        console.log(`   ${entity} table: ${count} records`);
      }
    }

    console.log('✅ Database audit completed successfully!');
  } catch (error) {
    console.error('❌ Database audit failed:', error);
    process.exit(1);
  } finally {
    await app.close();
  }
}

initDatabase(); 