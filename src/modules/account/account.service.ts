import { Types } from 'mongoose';
import { Injectable } from '@nestjs/common';

/** Local Imports **/
import {Account} from './schemas/account.schema';
import AccountRepository from './account.repository';
import CreateAccountDto from './dto/create.account.dto';

@Injectable()
export default class AccountService {
  constructor(private accountRepository: AccountRepository) {}

  async findOrCreate(address: string): Promise<Account> {
    const account = await this.accountRepository.model.findOne({address: address});

    if (!account) {
      return this.create({ address: address });
    }

    return account;
  }

  async create(createUserDto: CreateAccountDto): Promise<Account> {
    return this.accountRepository.model.create(createUserDto);
  }

  async findOne(id: Types.ObjectId): Promise<Account | undefined> {
    return this.accountRepository.model.findById(id);
  }
}
