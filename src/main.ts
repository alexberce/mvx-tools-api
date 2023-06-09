import * as bodyParser from 'body-parser';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';

import AppModule from './app.module';
import { GlobalExceptionFilter } from '@/common/filters';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(bodyParser.json({ limit: '1mb' }));
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, validateCustomDecorators: true }));

  // Filters configuration
  app.useGlobalFilters(new GlobalExceptionFilter());

  // Config declarations
  const configService = app.get(ConfigService);

  // Api configuration
  app.setGlobalPrefix('');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  // Cors configuration
  app.enableCors({ origin: '*' });

  // Swagger configuration
  const documentBuilder = new DocumentBuilder()
    .setTitle('xTools API')
    .setDescription('')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, documentBuilder);
  SwaggerModule.setup('/', app, document);

  await app.listen(configService.get('PUBLIC_APP_PORT'));

  Logger.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
