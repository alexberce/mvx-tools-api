import { Prop } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDocument } from '@/libs/database/mongo';

import { SnapshotFrequency, SnapshotType } from '../../enums';

export class SnapshotConfiguration extends AbstractDocument {
  @Exclude()
  @Prop({type: String})
  tokenType: string;

  @ApiProperty()
  @Prop({type: String, index: true})
  tokenIdentifier: string;

  @ApiProperty({ enum: SnapshotFrequency })
  @Prop({ type: String, enum: SnapshotFrequency })
  frequency: SnapshotFrequency;

  @ApiProperty({ enum: SnapshotType })
  @Prop({ type: String, enum: SnapshotType, default: SnapshotType.Dedicated })
  type: SnapshotType;

  @ApiProperty()
  @Prop({ type: Date, default: (new Date().setDate(new Date().getDate() - 1)) })
  lastExecuted: Date;
}
