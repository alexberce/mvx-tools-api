import { Types } from 'mongoose';
import { Exclude, Transform, Type } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { defaultSchemaOptions } from '@/libs/database/mongo';

import { SnapshotConfiguration } from './snapshot-configuration';

@Schema({...defaultSchemaOptions, collection: 'user-snapshot-configurations'})
export class UserSnapshotConfiguration extends SnapshotConfiguration {
  @Exclude()
  @Type(() => String)
  @Prop({type: Types.ObjectId})
  @Transform(({ value }) => value.toString())
  accountId: Types.ObjectId;
}

export const UserSnapshotConfigurationSchema = SchemaFactory.createForClass(UserSnapshotConfiguration);
