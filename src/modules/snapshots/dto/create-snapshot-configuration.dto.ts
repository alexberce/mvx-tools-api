import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

import { SnapshotFrequency, SnapshotType } from '../enums';

export class CreateSnapshotConfigurationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tokenIdentifier: string;

  @IsNotEmpty()
  @IsEnum(SnapshotFrequency)
  @ApiProperty({ enum: SnapshotFrequency })
  frequency: SnapshotFrequency;

  // TODO: Uncomment this when we implement shared snapshots
  // @IsNotEmpty()
  // @IsEnum(SnapshotType)
  // @ApiProperty({ enum: SnapshotType })
  // type: SnapshotType;
}
