import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export default class CreateAccountDto {
  @IsNotEmpty()
  @ApiProperty()
  address: string;
}
