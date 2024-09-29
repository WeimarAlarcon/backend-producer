import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class AppService {

  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async sendMessage(message: any) {
    console.log('Sending: ', message);
    return this.kafkaClient.emit('product.created', message); // Envía el mensaje al tópico "product.created"
  }
  getHello(): string {
    return 'Hello World!';
  }
}
