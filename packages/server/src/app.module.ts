import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import {
  GlobalAnyExceptionFilter,
  GlobalBadRequestExceptionFilter,
  GlobalHttpExceptionFilter,
  GlobalServiceExceptionFilter,
} from "./common/filters";
import { rootDbConfig } from "./database";
import { HealthModule } from "./modules/health";
import { UsersModule } from "./modules/users";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    TypeOrmModule.forRootAsync(rootDbConfig),
    HealthModule,
  ],
  controllers: [],
  providers: [
    { provide: APP_FILTER, useClass: GlobalAnyExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalBadRequestExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalHttpExceptionFilter },
    { provide: APP_FILTER, useClass: GlobalServiceExceptionFilter },
  ],
})
export class AppModule {}
