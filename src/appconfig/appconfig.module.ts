import { Global, Module } from '@nestjs/common';
import { AppconfigService } from './appconfig.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from '../../config';
import { TypeOrmModule } from '@nestjs/typeorm';
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
  ],
  providers: [AppconfigService],
  exports: [AppconfigService],
})
export class AppconfigModule {}
