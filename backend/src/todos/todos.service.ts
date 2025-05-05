import { Injectable } from '@nestjs/common'; 
import { DatabaseService } from '../database/database.service';

@Injectable()
export class TodoService {
  // DB情報の読み込み
  constructor(private readonly db: DatabaseService) {}

  /**
   * 全てのToDoを取得する
   * @param includeCompleted - 完了したToDoを含むかどうか
   * @returns ToDoリストの配列
   */
  async findAll(showCompleted: boolean) {
    const sql = `
      SELECT 
        "ＴＯＤＯ＿ＩＤ" AS id,
        "タイトル" AS title,
        "説明" AS description,
        "タグ" AS tag,
        "ＴＯＤＯ＿ステータス" AS status
      FROM "T_ToDoリスト"
      ${showCompleted ? "" : "WHERE \"ＴＯＤＯ＿ステータス\" != 1"}  -- 完了ステータスが1の場合を除外
      ORDER BY "ＴＯＤＯ＿ＩＤ"
    `;
    const result = await this.db.getClient().query(sql);
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

    /**
   * タグの一覧を取得する
   * @returns タグの名称の配列
   */
    async getTags() {
      const sql = `
        SELECT "タグ名称" AS tag
        FROM "T_タグ定数"
        ORDER BY "タグ名称"
      `;
      const result = await this.db.getClient().query(sql);
      return result.rows.map(row => row.tag);  // タグ名称の配列を返す
    }
}
