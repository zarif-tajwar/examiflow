import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getEnvValue } from './config/env.config';
import { ZodFilter } from './config/zod-pipe.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);

  const WEBSITE_URL = getEnvValue(configService, 'WEBSITE_URL');
  const PORT = getEnvValue(configService, 'PORT') || 3000;

  app.enableCors({
    origin: [WEBSITE_URL],
    credentials: true,
  });

  app.useGlobalFilters(new ZodFilter());

  await app.listen(PORT);

  console.log(`🚀 API Server is Listening at http://localhost:${PORT} 🚀`);
}
bootstrap();
