import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { Logger, ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Bootstrap');
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
  );

  app.enableCors({
     origin: ['http://localhost:3000'],
    //origin: ['http://10.27.63.114:3000', 'http://localhost:3000'],
    //origin: ['http://192.168.0.1:3000', 'http://localhost:3000'],
    credentials: true,
  });

  //app.enableCors({ origin: '*', credentials: true });
  await app.listen(3050, '0.0.0.0');
}
bootstrap();
