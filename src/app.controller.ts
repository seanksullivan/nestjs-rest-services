import { Injectable, UseGuards } from '@nestjs/common';
import { Controller, Get, Param, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiKeyGuard } from './apiKeyGuard';

@Injectable()
@Controller()
@UseGuards(ApiKeyGuard)
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get('default')
  async getHello(): Promise<string> {
    return await this.appService.getHello();
  }

  @Get('test/:id')
  async findOne(@Param('id') id: string) {
    return await this.appService.getMoreText(id);
  }

  @Get('test')
  async testWithQuery(@Query('id') id: string) {
      return await this.appService.getMoreText(id);
    }
}
