import { Module } from "@nestjs/common";

import { HealthCheckController } from "./controllers";

@Module({
  imports: [],
  controllers: [HealthCheckController],
})
export class HealthModule {}
