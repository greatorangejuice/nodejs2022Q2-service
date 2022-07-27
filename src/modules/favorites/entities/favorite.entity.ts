import { ApiProperty } from '@nestjs/swagger';

export class Favorite {
  @ApiProperty({
    example: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Track 1',
        duration: 10,
      },
    ],
  })
  tracks: Array<string>;
  @ApiProperty({
    example: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Album 1',
        year: 1970,
        artistId: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
      },
    ],
  })
  albums: Array<string>;
  @ApiProperty({
    example: [
      {
        id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        name: 'Artist 1',
        grammy: true,
      },
    ],
  })
  artists: Array<string>;
}
