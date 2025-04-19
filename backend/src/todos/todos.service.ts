import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TodoService {
  // DB情報の読み込み
  constructor(private readonly db: DatabaseService) {}

   /**
   * 全てのToDoを取得する
   * @returns 英語キーに変換したToDoリストの配列
   */
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
    // データベースから取得
    const result = await this.db.getClient().query(sql);

    // 取得した各行を英語キーのオブジェクトにマッピング
    return result.rows.map((row) => ({
      id: row['ToDo＿ID'],
      title: row['タイトル'],
      description: row['説明'],
      tag: row['タグ'],
      isDone: row['完了フラグ'],
    }));
  }

   /**
   * ToDo を新規作成する
   * @param todo - 作成するToDoの情報
   * @returns 作成されたToDoのID
   */
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

   /**
   * ToDo を更新する
   * @param id - 更新対象のToDo ID
   * @param todo - 更新内容
   * @returns 成功レスポンス
   */
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

   /**
   * ToDo を削除する
   * @param id - 削除対象のToDo ID
   * @returns 成功レスポンス
   */
  async delete(id: number) {
    const sql = `DELETE FROM "T_ToDoリスト" WHERE "ToDo＿ID" = $1`;
    await this.db.getClient().query(sql, [id]);
    return { success: true };
  }
}
