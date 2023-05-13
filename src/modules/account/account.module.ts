import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { MAIN_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo';

/** Local Imports **/
import AccountService from './account.service';
import AccountRepository from './account.repository';
import { Account, AccountSchema } from './schemas/account.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema }
    ], MAIN_MONGO_DB_CONNECTION_NAME),
  ],
  providers: [
    AccountService,
    AccountRepository,
  ],
  exports: [AccountService, AccountRepository],
})
export default class AccountModule {}
