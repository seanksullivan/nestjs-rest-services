import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  apiKey: any;
  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('apiKey');
  }

  async getBasicResponse(): Promise<string> {
    return 'Hello World!!!';
  }

  async getValue(id: string): Promise<any> {
    return `Id Value: ${id}`
  }

  async isKeyValid(key: any): Promise<boolean> {
    if (key == this.apiKey) {
      return true;
    }

    return false;
  }
}
