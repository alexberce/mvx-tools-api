import { Injectable } from '@nestjs/common';

import { JwtModel, JwtService } from '@/libs/security/jwt';
import { Account } from '@/modules/account/schemas/account.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
  ) {}

  signIn(user: Account): JwtModel {
    return this.jwtService.generateJwt({
      id: user._id,
    });
  }

  refreshToken(token: string): JwtModel {
    return this.jwtService.refreshToken(token);
  }
}
