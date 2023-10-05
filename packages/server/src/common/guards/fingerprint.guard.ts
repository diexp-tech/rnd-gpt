import { createHash } from "node:crypto";

import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";


@Injectable()
export class FingerprintGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const fingerprint = createHash("sha1")
      .update(req.ip || "127.0.0.1")
      .update(req.headers["user-agent"])
      .digest("hex");

    req.fingerprint = fingerprint;

    return true;
  }
}
