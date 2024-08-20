import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  apiKey: any;
  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('apiKey');
  }

  getHello(): string {
    return 'Hello World!!!';
  }

  getMoreText(id: string): any {
    return `Id Value: ${id}`
  }

  isKeyValid(key: any): boolean {
    if (key == this.apiKey) {
      return true;
    }

    return false;
  }
}
