import { CanActivate, ExecutionContext, Injectable, Logger } from "@nestjs/common";

import { UsersService } from "@module/modules/users/services";


@Injectable()
export class UserGuard implements CanActivate {
  private readonly logger = new Logger(UserGuard.name);

  constructor(
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    const { fingerprint } = req;

    if (!fingerprint) {
      this.logger.error("No FingerprintGuard is injected before UserGuard");
      return false;
    }

    let user = await this.usersService.findOne({ where: { fingerprint } });
    if (!user) {
      user = await this.usersService.create({ fingerprint });
    }

    req.user = user;

    return true;
  }
}
