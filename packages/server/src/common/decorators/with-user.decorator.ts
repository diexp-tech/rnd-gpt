import { applyDecorators, UseGuards } from "@nestjs/common";

import { FingerprintGuard, UserGuard } from "@module/common/guards";

export const WithUser = () => (
  applyDecorators(
    UseGuards(FingerprintGuard, UserGuard),
  )
);
