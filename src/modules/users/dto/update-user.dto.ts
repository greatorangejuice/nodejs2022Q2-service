import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsString()
  @ApiProperty({ example: 'password' })
  oldPassword: string;
  @IsString()
  @ApiProperty({ example: 'new_password' })
  newPassword: string;
}
