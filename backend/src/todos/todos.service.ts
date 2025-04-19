// src/todo/todo.service.ts
import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TodoService {
  constructor(private readonly db: DatabaseService) {}

  async findAll() {
    const sql = `
      SELECT 
        "ToDo＿ID",
        "タイトル",
        "説明",
        "タグ",
        "完了フラグ"
      FROM "T_ToDoリスト"
      ORDER BY "ToDo＿ID"
    `;
    const result = await this.db.getClient().query(sql);

    // 英語のキーに変換して返す
    return result.rows.map((row) => ({
      id: row['ToDo＿ID'],
      title: row['タイトル'],
      description: row['説明'],
      tag: row['タグ'],
      isDone: row['完了フラグ'],
    }));
  }

  async create(todo: {
    title: string;
    description?: string;
    tag?: string;
  }) {
    const sql = `
      INSERT INTO "T_ToDoリスト" ("タイトル", "説明", "タグ")
      VALUES ($1, $2, $3)
      RETURNING "ToDo＿ID"
    `;
    const values = [todo.title, todo.description || null, todo.tag || null];
    const result = await this.db.getClient().query(sql, values);
    return { id: result.rows[0]['ToDo＿ID'] };
  }

  async update(id: number, todo: {
    title: string;
    description?: string;
    tag?: string;
    isDone: boolean;
  }) {
    const sql = `
      UPDATE "T_ToDoリスト"
      SET "タイトル" = $1,
          "説明" = $2,
          "タグ" = $3,
          "完了フラグ" = $4
      WHERE "ToDo＿ID" = $5
    `;
    const values = [todo.title, todo.description || null, todo.tag || null, todo.isDone, id];
    await this.db.getClient().query(sql, values);
    return { success: true };
  }

  async delete(id: number) {
    const sql = `DELETE FROM "T_ToDoリスト" WHERE "ToDo＿ID" = $1`;
    await this.db.getClient().query(sql, [id]);
    return { success: true };
  }
}
