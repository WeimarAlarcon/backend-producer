import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { PersonasModule } from './personas/personas.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'producer-client-id',
            brokers: ['localhost:9092'],
            connectionTimeout: 30000,  // 30 segundos de espera para la conexión
            // authenticationTimeout: 1000,  // Tiempo de espera para la autenticación (1 segundo)
            // reauthenticationThreshold: 10000,  // Tiempo para volver a autenticarse (10 segundos)
            retry: {
              retries: 10,  // Número de reintentos
              initialRetryTime: 300,  // Tiempo de espera inicial para reintentos (ms)
            },
          },
          consumer: {
            groupId: 'producer-group',  // GroupId único para backend 1
          },

        },
      },
    ]),
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST, 
      port: +process.env.DB_PORT,
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      autoLoadEntities: true,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.SYNCHRONIZE as any,
    }),
    PersonasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
