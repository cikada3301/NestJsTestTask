import {Controller, Get, Param, Query} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(':name/:email/:phone/')
  async getContact(@Param('name') name: string,
             @Param('email') email: string,
             @Param('phone') phone: string) {
    await this.appService.getContact(name, email, phone);
  }
}
