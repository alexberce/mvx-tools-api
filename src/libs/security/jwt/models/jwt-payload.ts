import { Types } from 'mongoose';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class JwtPayload {
  @ApiProperty()
  @Type(() => Types.ObjectId)
  id: Types.ObjectId;

  static fromRefreshTokenPayload(
    payload: Partial<JwtPayload>
  ): JwtPayload {
    const newPayload = new JwtPayload();
    newPayload.id = Types.ObjectId.createFromHexString(payload.id.toString()) as Types.ObjectId;

    return newPayload;
  }
}
