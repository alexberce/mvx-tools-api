import {Connection, Model} from 'mongoose';
import { Injectable } from '@nestjs/common';
import {InjectConnection, InjectModel} from '@nestjs/mongoose';

import { AbstractRepository, MAIN_MONGO_DB_CONNECTION_NAME } from '@/libs/database/mongo';

import { Account } from './schemas/account.schema';

@Injectable()
export default class AccountRepository extends AbstractRepository<Account> {
  constructor(
    @InjectConnection(MAIN_MONGO_DB_CONNECTION_NAME) connection: Connection,
    @InjectModel(Account.name, MAIN_MONGO_DB_CONNECTION_NAME) public model: Model<Account>,
  ) {
    super(model, connection);
  }
}
