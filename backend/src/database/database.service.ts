// src/database/database.service.ts
import { Injectable, OnModuleInit } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit {
  private pool!: Pool;

  async onModuleInit() {
    this.pool = new Pool({
      user: 'postgres',
      host: 'localhost',
      database: 'todo_app',
      password: 'password',
      port: 5432,
    });
  }

  async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      return await client.query(text, params);
    } finally {
      client.release();
    }
  }
  
  getClient(): Pool {
    return this.pool;
  }
}