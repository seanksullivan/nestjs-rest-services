import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { AppService } from "./app.service";


@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private readonly apiKeyService: AppService) {} // made up service for the point of the exmaple

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const key = req.headers['x-api-key'] ?? req.query.api_key; // checks the header, moves to query if null
    console.log(`key = ${key}`);
    let apiKeyChallenge = this.apiKeyService.isKeyValid(key);

    return apiKeyChallenge;
  }
}