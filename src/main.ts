import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as express from 'express';
import { join } from 'path';
import { config } from 'dotenv';

async function bootstrap() {
  // dotenv
  config();

  const app = await NestFactory.create(AppModule, { cors: false });

  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));

  app.enableCors({ credentials: true, origin: true });

  const swaggerConfig = new DocumentBuilder()
      .setTitle('Облачное хранилище')
      .setVersion('1.0')
      .addBearerAuth()
      .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('swagger', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    }
  });

  await app.listen(7777);
}
bootstrap();
