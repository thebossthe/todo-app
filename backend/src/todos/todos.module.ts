import { Module } from '@nestjs/common';
import { TodoService } from './todos.service';
import { TodoController } from './todos.controller';
import { DatabaseModule } from '../database/databese.module';

@Module({
  imports: [DatabaseModule],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}