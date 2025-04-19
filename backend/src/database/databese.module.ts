import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Module({
  providers: [DatabaseService],
  exports: [DatabaseService],  // TodoModule で使えるようにエクスポート
})
export class DatabaseModule {}