import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EnvironmentConfigService {
  constructor(private configService: ConfigService) {}
  getPort(): number {
    return this.configService.get<number>('port');
  }

  getRedisConfig() {
    return this.configService.get<any>('redis');
  }

  getDatabase(): string {
    return this.configService.get<string>('database');
  }
}
