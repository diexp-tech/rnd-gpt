import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const ReqUserFp = createParamDecorator((_data, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest();

  return req.fingerprint;
});
