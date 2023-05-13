import { ApiProperty } from '@nestjs/swagger';

export class SnapshotItemData {
  @ApiProperty()
  address: string;

  @ApiProperty()
  balanceString: string;

  @ApiProperty()
  balanceNumber: number;
}
