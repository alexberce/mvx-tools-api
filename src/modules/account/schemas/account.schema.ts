import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AbstractDocument, defaultSchemaOptions } from '@/libs/database/mongo';

import Role from '../enums/role.enum';

@Schema({ ...defaultSchemaOptions, collection: 'accounts' })
export class Account extends AbstractDocument {
  @ApiProperty()
  @Prop({ type: String, unique: true })
  address: string;

  @ApiProperty()
  @Prop({ type: String, default: Role.User })
  role: Role;
}

export const AccountSchema = SchemaFactory.createForClass(Account);
