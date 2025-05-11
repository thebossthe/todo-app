import { Injectable } from '@nestjs/common'; 
import { DatabaseService } from '../database/database.service';
import { loadSql } from '../utils/sql-loader'

@Injectable()
export class TodoService {
  // DB情報の読み込み
  constructor(private readonly db: DatabaseService) {}

  /**
   * 全てのToDoを取得する
   * @param includeCompleted - 完了したToDoを含むかどうか
   * @returns ToDoリストの配列
   */
  async findAll(
    showCompleted: boolean // 画面側「完了も含む」のチェックボックス
  ) {
    const sql = loadSql('findAll.sql');
    const result = await this.db.getClient().query(sql, [showCompleted]);
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
    const sql = loadSql('createTodo.sql');
    const values = [todo.title, todo.description || null, todo.tag || null, todo.status || 0];
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
    const sql = loadSql('updateTodo.sql');
    const values = [todo.title, todo.description || null, todo.tag || null, todo.status, id];
    const result = await this.db.getClient().query(sql, values);
    return { id: result.rows[0].id };
  }

  /**
   * ToDo を削除する
   * @param id - 削除対象のToDo ID
   * @returns 成功レスポンス
   */
  async delete(id: number) {
    const sql = loadSql('deleteTodo.sql');
    const result = await this.db.getClient().query(sql, [id]);
    return { success: true, id: result.rows[0].id };
  }

    /**
   * タグの一覧を取得する
   * @returns タグの名称の配列
   */
    async getTags() {
      const sql = loadSql('getTags.sql');
      const result = await this.db.getClient().query(sql);
      return result.rows.map(row => row.tag);
    }
}
