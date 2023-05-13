import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';

import { JwtModule } from '@/libs/security/jwt';
import AccountModule from '@/modules/account/account.module';

import { AuthService } from './auth.service';
import AuthController from './auth.controller';
import { JwtAuthStrategy, LocalAuthStrategy } from './strategies';

@Module({
  imports: [
    JwtModule,
    AccountModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  exports: [PassportModule],
  controllers: [AuthController],
  providers: [AuthService, JwtAuthStrategy, LocalAuthStrategy],
})
export default class AuthModule {}
