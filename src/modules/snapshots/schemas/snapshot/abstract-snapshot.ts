import { Prop } from '@nestjs/mongoose';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

import { AbstractDocument } from '@/libs/database/mongo';

export class AbstractSnapshot extends AbstractDocument {
  @Exclude()
  @Prop({type: String, index: true})
  tokenIdentifier: string;

  @Exclude()
  @Prop({type: Number})
  chunkSize: number;

  @ApiProperty()
  @Prop({type: Number})
  uniqueHolders: number;
}
