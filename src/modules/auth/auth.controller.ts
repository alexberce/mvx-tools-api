import { ApiTags } from '@nestjs/swagger';
import {
  HttpCode,
  Query,
  Post,
  Body,
  Req,
  UseGuards,
  Controller,
  ClassSerializerInterceptor,
  UseInterceptors,
} from '@nestjs/common';

import { JwtModel } from '@/libs/security/jwt';
import { AuthenticatedRequest } from '@/modules/auth/types';

import { LocalAuthGuard } from './guards';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';

@ApiTags('Auth')
@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-in')
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  async signIn(@Body() dto: SignInDto, @Req() request: AuthenticatedRequest): Promise<JwtModel> {
    const { user } = request;
    return this.authService.signIn(user);
  }

  @Post('refresh-token')
  async refreshToken(@Query('refreshToken') token: string): Promise<JwtModel> {
    return this.authService.refreshToken(token);
  }
}
