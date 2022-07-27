import { IsBoolean, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @IsString()
  @ApiProperty({ example: 'Artist 1' })
  name: string;

  @IsBoolean()
  @ApiProperty({ example: true, required: false })
  grammy: boolean;
}
