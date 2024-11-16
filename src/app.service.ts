import { Global, Injectable } from '@nestjs/common';

@Injectable()
@Global()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
