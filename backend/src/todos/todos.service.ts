// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TodoService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    return this.db.query('SELECT * FROM todos ORDER BY id DESC');
  }

  async create(title: string, description: string) {
    return this.db.query(
      'INSERT INTO todos (title, description, is_completed) VALUES ($1, $2, $3) RETURNING *',
      [title, description, false],
    );
  }

  async update(id: number, title: string, description: string, isCompleted: boolean) {
    return this.db.query(
      'UPDATE todos SET title = $1, description = $2, is_completed = $3 WHERE id = $4 RETURNING *',
      [title, description, isCompleted, id],
    );
  }

  async remove(id: number) {
    return this.db.query('DELETE FROM todos WHERE id = $1', [id]);
  }
}
