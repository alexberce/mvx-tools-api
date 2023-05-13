import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { JwtPayload } from '@/libs/security/jwt';
import AccountService from '@/modules/account/account.service';

@Injectable()
export class JwtAuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private readonly accountService: AccountService,
  ) {
    super({
      ignoreExpiration: false,
      secretOrKey: config.get('JWT_ACCESS_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const account = await this.accountService.findOne(payload.id);

    if (!account) throw new UnauthorizedException();

    return account;
  }
}
