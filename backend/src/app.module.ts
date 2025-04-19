import { Module } from '@nestjs/common';
import { TodoModule } from './todos/todos.module';
import { DatabaseService } from './database/database.service';

@Module({
  imports: [TodoModule],
  providers: [DatabaseService],
})
export class AppModule {}