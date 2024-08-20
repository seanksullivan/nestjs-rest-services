import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApiKeyGuard } from './apiKeyGuard';
import { ConfigModule, ConfigService } from '@nestjs/config';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;
  let configService: ConfigService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [() => ({ 
            customConfig: {
              apiKey: 'testValue'
            }
          })]
        })
      ],
      controllers: [AppController],
      providers: [
        AppService,
        {
          provide: 'APP_GUARD',
          useClass: ApiKeyGuard,
        },
      ],
    }).compile();

    appController = moduleRef.get<AppController>(AppController);
    appService = moduleRef.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', async () => {
      const result = 'Hello World!!!';

      expect(await appController.getHello()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return the text for the given id', async () => {
      const id = '123';
      const result = `Id Value: ${id}`;

      expect(await appController.findOne(id)).toBe(result);
    });
  });

  describe('testWithQuery', () => {
    it('should return the text for the given query id', async () => {
      const id = '456';
      const result = `Text for query id ${id}`;
      jest.spyOn(appService, 'getMoreText').mockImplementation(async () => result);

      expect(await appController.testWithQuery(id)).toBe(result);
    });
  });

  describe('testWithQuery-2', () => {
    it('should return the text for the given query id', async () => {
      const id = '456';
      const result = `Id Value: ${id}`;

      expect(await appController.testWithQuery(id)).toBe(result);
    });
  });
});