import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleAsyncOptions } from "@nestjs/typeorm/dist/interfaces/typeorm-options.interface";

import { MessageEntity, UserEntity } from "./entities";
import { TypeormNamingStrategy } from "./typeorm-naming-strategy";

export const rootDbConfig: TypeOrmModuleAsyncOptions = {
  useFactory: async (config: ConfigService) => {
    const env = config.get("NODE_ENV");

    if (env === "production") {
      return ({
        type: "postgres",
        synchronize: true,
        entities: [UserEntity, MessageEntity],
        namingStrategy: new TypeormNamingStrategy(),
        extra: { max: 60 },
        url: config.get("DB_URL"),
      });
    }

    return ({
      type: "postgres",
      synchronize: true,
      entities: [UserEntity, MessageEntity],
      namingStrategy: new TypeormNamingStrategy(),
      extra: {
        max: 60,
      },
      host: config.get("DB_HOST"),
      port: config.get("DB_PORT"),
      username: config.get("DB_USER"),
      password: config.get("DB_PASS"),
      database: config.get("DB_NAME"),
      ssl: config.get("DB_USE_SSL") === "true"
        ? {
          rejectUnauthorized: true,
          ca: config.get("DB_SSL_CERTS"),
        }
        : false,
    });
  },
  inject: [ConfigService],
};
