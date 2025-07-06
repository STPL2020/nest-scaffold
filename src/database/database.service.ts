import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  /**
   * Get the database connection
   */
  getConnection(): DataSource {
    return this.dataSource;
  }

  /**
   * Check if the database is connected
   */
  async isConnected(): Promise<boolean> {
    return this.dataSource.isInitialized;
  }

  /**
   * Get database statistics
   */
  async getStats(): Promise<{
    isConnected: boolean;
    database: string;
    entities: string[];
  }> {
    return {
      isConnected: await this.isConnected(),
      database: this.dataSource.options.database as string,
      entities: this.dataSource.entityMetadatas.map(entity => entity.name),
    };
  }

  /**
   * Run a raw query
   */
  async query(sql: string, parameters?: any[]): Promise<any> {
    return this.dataSource.query(sql, parameters);
  }

  /**
   * Get the number of records in a table
   */
  async getTableCount(tableName: string): Promise<number> {
    const result = await this.query(`SELECT COUNT(*) as count FROM ${tableName}`);
    return result[0]?.count || 0;
  }
} 