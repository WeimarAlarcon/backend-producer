import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); 
  app.enableCors();
  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: http://localhost:${ process.env.APP_PORT }`);
}
bootstrap();
