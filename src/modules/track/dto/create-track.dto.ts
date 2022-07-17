import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @IsString()
  @ApiProperty({ example: 'Track 1' })
  name: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    required: false,
  })
  artistId: string;

  @IsString()
  @IsOptional()
  @ApiProperty({
    example: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    required: false,
  })
  albumId: string;

  @IsNumber()
  @ApiProperty({ example: 10 })
  duration: number;
}
