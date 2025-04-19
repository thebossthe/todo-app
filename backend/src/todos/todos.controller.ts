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
  create(@Body() body: { title: string; description: string }) {
    return this.todoService.create(body.title, body.description);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() body: { title: string; description: string; isCompleted: boolean },
  ) {
    return this.todoService.update(+id, body.title, body.description, body.isCompleted);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoService.remove(+id);
  }
}