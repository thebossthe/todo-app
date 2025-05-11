import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * 指定された SQL ファイルの内容を文字列として読み込む
 * @param fileName ファイル名（例: 'findAll.sql'）
 * @returns SQLの文字列
 */
export function loadSql(fileName: string): string {
  return readFileSync(join(__dirname, '..', 'sql', fileName), 'utf8');
}