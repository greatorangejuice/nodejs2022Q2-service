import { ApiProperty } from '@nestjs/swagger';

export class Track {
  constructor(partial: Partial<Track>) {
    Object.assign(this, partial);
  }
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'Track 1' })
  name: string;
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  artistId: string | null;
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  albumId: string | null;
  @ApiProperty({ example: 10 })
  duration: number;
}
