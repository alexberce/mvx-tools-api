import { Schema, SchemaFactory } from '@nestjs/mongoose';

import { defaultSchemaOptions } from '@/libs/database/mongo';

import { AbstractSnapshotData } from './abstract-snapshot-data';

@Schema({...defaultSchemaOptions, collection: 'on-demand-snapshot-data'})
export class OnDemandSnapshotData extends AbstractSnapshotData {}

export const OnDemandSnapshotDataSchema = SchemaFactory.createForClass(OnDemandSnapshotData);
