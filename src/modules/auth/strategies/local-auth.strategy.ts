import { Strategy } from 'passport-local';
import { Injectable, Req } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';

import AccountService from '@/modules/account/account.service';
import { Account } from '@/modules/account/schemas/account.schema';

@Injectable()
export class LocalAuthStrategy extends PassportStrategy(Strategy) {
  constructor(private accountService: AccountService) {
    super({
      usernameField: 'address',
      //TODO: Passport requires a password field. Replace this with signature
      passwordField: 'address',
    });
  }

  async validate(address: string, password: string): Promise<Account> {
    //TODO: This is just for the Hackathon
    return this.accountService.findOrCreate(address);
  }
}
