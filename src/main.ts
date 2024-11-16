import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppconfigService } from './appconfig/appconfig.service';
import { Environment } from './common/constants/types.enum';
import { getLogLevels } from './common/utils/getLogLevels';
import {
  INestApplication,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { SWAGGER_DOCUMENTATION_PATH } from './common/constants/general.constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, environment, packageVersion } = app.get(AppconfigService);
  const isProductionEnvironment = environment === Environment.production;

  app.useLogger(getLogLevels(isProductionEnvironment));
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
    }),
  );
  // swagger should not be used in productions
  if (!isProductionEnvironment) enableApiDocumentation(app, packageVersion);
  await app.listen(port || 3000);
}
bootstrap();

const enableApiDocumentation = (
  app: INestApplication,
  version: string,
): void => {
  const config = new DocumentBuilder()
    .setTitle('Monitoring service')
    .setDescription("Set of API's of the monitoring platform")
    .setVersion(version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(
    app,
    config,
    //    {
    //   extraModels: [ Paginat]
    // }
  );
  SwaggerModule.setup(SWAGGER_DOCUMENTATION_PATH, app, document);
};
