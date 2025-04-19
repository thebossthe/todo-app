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
      password: 'lmj95368',
      port: 5432,
    });
  }

  async query(text: string, params?: any[]) {
    const client = await this.pool.connect();
    try {
      const res = await client.query(text, params);
      return res.rows;
    } finally {
      client.release();
    }
  }
}