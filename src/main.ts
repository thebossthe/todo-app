import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
  app.enableCors();
}
bootstrap();

fetch('http://localhost:3000/api/hoge')
  .then(res => res.json())
  .then(data => console.log(data));