import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  constructor(partial: Partial<LoginUserDto>) {
    Object.assign(this, partial);
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: 'Login 1' })
  login: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ example: '123' })
  password: string;
}
