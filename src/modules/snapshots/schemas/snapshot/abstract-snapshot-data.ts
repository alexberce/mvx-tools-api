import { Types } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Type } from 'class-transformer';

import { AbstractDocument } from '@/libs/database/mongo';

import { SnapshotItemData } from '../../models/snapshot-item-data';

export class AbstractSnapshotData extends AbstractDocument {
  @Exclude()
  @Prop({type: Types.ObjectId, index: true})
  snapshotId: Types.ObjectId;

  @Type(() => SnapshotItemData)
  @Prop({ type: Array<SnapshotItemData>, default: [] })
  @ApiProperty({ type: SnapshotItemData, isArray: true })
  data: SnapshotItemData[];

  @Exclude()
  @Prop({type: Number})
  chunk: number;
}
