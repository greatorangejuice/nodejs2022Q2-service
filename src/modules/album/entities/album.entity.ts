import { ApiProperty } from '@nestjs/swagger';

export class Album {
  constructor(partial: Partial<Album>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'Album 1' })
  name: string;
  @ApiProperty({ example: 1970 })
  year: number;
  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  artistId: string | null;
}
