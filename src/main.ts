import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api'); 
  app.enableCors();
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['localhost:9092'],  // Dirección del broker Kafka
      },
      consumer: {
        groupId: 'producer-group',  // Asegúrate de que sea único por servicio
      },
    },
  });
  // Iniciar la aplicación de microservicio Kafka
  await app.startAllMicroservices();
  await app.listen(process.env.APP_PORT);
  console.log(`Application is running on: http://localhost:${ process.env.APP_PORT }`);
}
bootstrap();
