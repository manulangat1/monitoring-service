import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvironmentVariablesDTO } from './dto/env_variables.dto';

@Injectable()
export class AppconfigService {
  constructor(private configService: ConfigService<EnvironmentVariablesDTO>) {}

  get packageVersion(): string {
    return process.env.npm_package_version;
  }

  get environment(): string {
    return this.configService.get<string>('NODE_ENV');
  }
  get port(): number {
    return this.configService.get<number>('PORT');
  }
}
