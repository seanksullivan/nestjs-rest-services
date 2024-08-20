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
  async getResponse(): Promise<string> {
    return await this.appService.getBasicResponse();
  }

  @Get('test/:id')
  async paramExample(@Param('id') id: string) {
    return await this.appService.getValue(id);
  }

  @Get('test')
  async queryExample(@Query('id') id: string) {
      return await this.appService.getValue(id);
    }
}
