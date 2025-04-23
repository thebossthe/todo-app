import { Injectable } from '@nestjs/common'; 
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TodoService {
  // DB情報の読み込み
  constructor(private readonly db: DatabaseService) {}

  /**
   * 全てのToDoを取得する
   * @returns ToDoリストの配列
   */
  async findAll() {
    const sql = `
      SELECT 
        "ＴＯＤＯ＿ＩＤ" AS id,
        "タイトル" AS title,
        "説明" AS description,
        "タグ" AS tag,
        "ＴＯＤＯ＿ステータス" AS status
      FROM "T_ToDoリスト"
      ORDER BY "ＴＯＤＯ＿ＩＤ"
    `;
    // データベースから取得
    const result = await this.db.getClient().query(sql);

    // 取得した各行をそのまま返す
    return result.rows;
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
    status?: number;  // 任意のステータス（整数）
  }) {
    const sql = `
      INSERT INTO "T_ToDoリスト" ("タイトル", "説明", "タグ", "ＴＯＤＯ＿ステータス")
      VALUES ($1, $2, $3, $4)
      RETURNING "ＴＯＤＯ＿ＩＤ" AS id
    `;
    const values = [todo.title, todo.description || null, todo.tag || null, todo.status || 0]; // デフォルトは0
    const result = await this.db.getClient().query(sql, values);
    return { id: result.rows[0].id };
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
    status: number;  // 任意のステータス（整数）
  }) {
    const sql = `
      UPDATE "T_ToDoリスト"
      SET "タイトル" = $1,
          "説明" = $2,
          "タグ" = $3,
          "ＴＯＤＯ＿ステータス" = $4
      WHERE "ＴＯＤＯ＿ＩＤ" = $5
      RETURNING "ＴＯＤＯ＿ＩＤ" AS id
    `;
    const values = [
      todo.title,
      todo.description || null,
      todo.tag || null,
      todo.status,  // 任意のステータス（整数）
      id
    ];
    const result = await this.db.getClient().query(sql, values);
    return { id: result.rows[0].id };
  }

  /**
   * ToDo を削除する
   * @param id - 削除対象のToDo ID
   * @returns 成功レスポンス
   */
  async delete(id: number) {
    const sql = `DELETE FROM "T_ToDoリスト" WHERE "ＴＯＤＯ＿ＩＤ" = $1 RETURNING "ＴＯＤＯ＿ＩＤ" AS id`;
    const result = await this.db.getClient().query(sql, [id]);
    return { success: true, id: result.rows[0].id };
  }
}
