import { Types } from 'mongoose';
import { Exclude } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { defaultSchemaOptions } from '@/libs/database/mongo';

import { AbstractSnapshotData } from './abstract-snapshot-data';

@Schema({...defaultSchemaOptions, collection: 'daily-snapshots-data'})
export class DailySnapshotData extends AbstractSnapshotData {
  @Exclude()
  @Prop({type: Types.ObjectId, index: true})
  snapshotConfigId: Types.ObjectId;
}

export const DailySnapshotDataSchema = SchemaFactory.createForClass(DailySnapshotData);
