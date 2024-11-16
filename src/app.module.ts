import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppconfigModule } from './appconfig/appconfig.module';
import { AdminModule } from './admin/admin.module';

@Module({
  imports: [AppconfigModule, AdminModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
