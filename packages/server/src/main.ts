import { Logger, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { NestExpressApplication } from "@nestjs/platform-express";

import { AppModule } from "./app.module";

async function bootstrap(): Promise<void> {
  const config = new ConfigService();

  const app = await NestFactory.create<NestExpressApplication>(AppModule, { bufferLogs: true });

  app.enableCors({ origin: config.get("CORS_URLS").split(",") });
  app.setGlobalPrefix("api");

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  const port = +config.get("PORT");

  await app.listen(port)
    .then(() => {
      Logger.log(`Server(${config.get("NODE_ENV")}) initialized on port ${port}`);
    });
}

bootstrap();
