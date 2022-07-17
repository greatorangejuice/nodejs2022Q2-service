import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ example: 'NewUser' })
  login: string;
  @IsString()
  @ApiProperty({
    example: 'password',
  })
  password: string;
}
