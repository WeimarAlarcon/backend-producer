import { Module } from '@nestjs/common';
import { PersonasService } from './personas.service';
import { PersonasController } from './personas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './entities/persona.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  controllers: [PersonasController],
  providers: [PersonasService],
  imports: [
    TypeOrmModule.forFeature([Persona]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'producer-client-id',
            brokers: ['localhost:9092'], // Kafka corriendo en tu Docker,
            connectionTimeout: 30000,  // 30 segundos de espera para la conexión
            // authenticationTimeout: 1000,  // Tiempo de espera para la autenticación (1 segundo)
            // reauthenticationThreshold: 10000,  // Tiempo para volver a autenticarse (10 segundos)
            retry: {
              retries: 10,  // Número de reintentos
              initialRetryTime: 3000,  // Tiempo de espera inicial para reintentos (ms)
            },
          },
          consumer: {
            groupId: 'persona-group', // Nombre del grupo de consumidores
            heartbeatInterval: 3000, // Intervalo de heartbeat en milisegundos (3 segundos)
            sessionTimeout: 45000, // Timeout de la sesión en milisegundos (30 segundos)
            rebalanceTimeout: 60000, // Timeout para la operación de rebalancing
            
          },
        },
      },
    ]),
  ],
})
export class PersonasModule {}
