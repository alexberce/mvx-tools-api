import { Exclude } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { defaultSchemaOptions } from '@/libs/database/mongo';

import {SnapshotConfiguration} from './snapshot-configuration';

@Schema({...defaultSchemaOptions, collection: 'shared-snapshot-configurations'})
export class SharedSnapshotConfiguration extends SnapshotConfiguration {
  @Exclude()
  @Prop({type: Number})
  requestCount: number;
}

export const SharedSnapshotConfigurationSchema = SchemaFactory.createForClass(SharedSnapshotConfiguration);
