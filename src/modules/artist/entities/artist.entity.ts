import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  constructor(partial: Partial<Artist>) {
    Object.assign(this, partial);
  }

  @ApiProperty({ example: '3fa85f64-5717-4562-b3fc-2c963f66afa6' })
  id: string;
  @ApiProperty({ example: 'Artist 1' })
  name: string;
  @ApiProperty({ example: true, required: false })
  grammy: boolean;
}
