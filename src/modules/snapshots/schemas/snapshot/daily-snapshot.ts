import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { defaultSchemaOptions } from '@/libs/database/mongo';

import { AbstractSnapshot } from './abstract-snapshot';

@Schema({...defaultSchemaOptions, collection: 'daily-snapshots'})
export class DailySnapshot extends AbstractSnapshot {}

export const DailySnapshotSchema = SchemaFactory.createForClass(DailySnapshot);
