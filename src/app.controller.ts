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
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test/:id')
  findOne(@Param('id') id: string) {
    return this.appService.getMoreText(id);
  }

  @Get('test')
  testWithQuery(@Query('id') id: string) {
      return this.appService.getMoreText(id);
    }
}
