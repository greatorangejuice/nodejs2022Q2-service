import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'New user' })
  login: string;
  @Exclude({ toPlainOnly: true })
  password: string;
  @ApiProperty({ example: 1 })
  version: number;
  @ApiProperty({ example: 1655000000 })
  createdAt: Date;
  @ApiProperty({ example: 1655000000 })
  updatedAt: Date;
}
