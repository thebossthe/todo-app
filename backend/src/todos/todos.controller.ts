import { Controller, Get, Post, Put, Delete, Body, Param , Query} from '@nestjs/common';
import { TodoService } from './todos.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  /**
   * ToDo一覧を取得
   * @param includeCompleted 完了タスクも含めるか
   * @param title            タイトルによる検索キーワード
   * @param tag              タグによるフィルタ
   */
  @Get()
  async findAll(
    @Query('includeCompleted') includeCompleted: string,
    @Query('title') title = '',
    @Query('tag') tag = 'All',
  ) {
    const showCompleted = includeCompleted === 'true';
    return this.todoService.findAll(showCompleted, title, tag);
  }

  /**
   * ToDoを新規作成
   */
  @Post()
  async create(
    @Body()
    body: {
      title: string;
      description?: string;
      tag?: string;
      status?: number;
    },
  ) {
    return await this.todoService.create(body);
  }

  /**
   * ToDoを更新
   * @param id ToDoのID
   */
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body()
    body: {
      title: string;
      description?: string;
      tag?: string;
      status: number;
    },
  ) {
    return await this.todoService.update(Number(id), body);
  }

  /**
   * ToDoを削除
   * @param id ToDoのID
   */
  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.todoService.delete(Number(id));
  }

  /**
   * タグ一覧を取得
   */
  @Get('tags')
  async getTags() {
    return await this.todoService.getTags();
  }
}