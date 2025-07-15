import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger('Bootstrap');

  app.setGlobalPrefix('api');

  // Servir archivos estáticos
  app.useStaticAssets(join(__dirname, '..', 'uploads'), {
    prefix: '/uploads/',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  app.enableCors({
    // origin: ['http://31.97.23.62:3090','http://localhost:3090', ],
    origin: ['http://localhost:3091', ],
    credentials: true,
  });

  await app.listen(3090, '0.0.0.0');
  logger.log(`Servidor corriendo en http://localhost:3090`);
}
bootstrap();