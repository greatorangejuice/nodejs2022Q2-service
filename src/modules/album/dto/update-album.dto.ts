import { IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @IsString()
  @ApiProperty({ example: 'Album 1' })
  name: string;

  @IsNumber()
  @ApiProperty({ example: 1970 })
  year: number;

  @IsString()
  @IsOptional()
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  artistId: string;
}
