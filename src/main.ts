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
     origin: ['http://localhost:3090','http://31.97.23.62:3090'],
   
    credentials: true,
  });

  //app.enableCors({ origin: '*', credentials: true });
  await app.listen(3090, '0.0.0.0');
}
bootstrap();
