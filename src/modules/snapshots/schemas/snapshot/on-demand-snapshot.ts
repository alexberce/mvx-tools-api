import { Types } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Transform, Type } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { defaultSchemaOptions } from '@/libs/database/mongo';

import { AbstractSnapshot } from './abstract-snapshot';

@Schema({...defaultSchemaOptions, collection: 'on-demand-snapshots'})
export class OnDemandSnapshot extends AbstractSnapshot {
  @Exclude()
  @Type(() => String)
  @ApiProperty({ type: String })
  @Prop({type: Types.ObjectId, index: true})
  @Transform(({ value }) => value.toString())
  accountId: Types.ObjectId;
}

export const OnDemandSnapshotSchema = SchemaFactory.createForClass(OnDemandSnapshot);
