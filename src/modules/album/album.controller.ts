import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from '../users/entities/user.entity';
import { Track } from '../track/entities/track.entity';
import { Album } from './entities/album.entity';

@Controller('album')
@ApiTags('Album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  @ApiOperation({ description: 'Create album' })
  @ApiResponse({
    status: 201,
    description: 'Create album',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. body does not contain required fields',
  })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumService.create(createAlbumDto);
  }

  @Get()
  @ApiOperation({ description: 'Get all albums' })
  @ApiResponse({
    status: 200,
    description: 'Get all albums',
    type: Album,
    isArray: true,
  })
  findAll() {
    return this.albumService.findAll();
  }

  @Get(':id')
  @ApiOperation({ description: 'Get album by id' })
  @ApiResponse({
    status: 200,
    description: 'Get album by id',
    type: Album,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album is not found',
  })
  findOne(@Param('id') id: string) {
    return this.albumService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ description: 'Updates a album by id' })
  @ApiResponse({
    status: 200,
    description: 'Updates a album by id',
    type: Track,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album is not found',
  })
  update(@Param('id') id: string, @Body() updateAlbumDto: UpdateAlbumDto) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ description: 'Updates a album by id' })
  @ApiResponse({
    status: 204,
    description: 'Remove album',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album is not found',
  })
  remove(@Param('id') id: string) {
    return this.albumService.remove(id);
  }
}
