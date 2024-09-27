import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('send')
  async sendMessage(@Body() body: { message: any }) {
    const { message } = body;
    await this.appService.sendMessage(message);
    return { status: 'Message sent' };
  }
}
