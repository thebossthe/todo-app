import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { TodoService } from './todos.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  findAll() {
    return this.todoService.findAll();
  }

  @Post()
  async create(@Body() body: { title: string; description?: string; tag?: string; status?: number }) {
    return await this.todoService.create(body);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() body: { title: string; description?: string; tag?: string; status: number } // `isDone` -> `status`
  ) {
    return await this.todoService.update(Number(id), body);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.todoService.delete(Number(id));
  }
}
