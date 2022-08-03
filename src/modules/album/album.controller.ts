import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Track } from '../track/entities/track.entity';
import { Album } from './entities/album.entity';
import { Auth } from '../auth/auth.decorator';
import { Me } from '../auth/current-user.decorator';

@Controller('album')
@ApiTags('Album')
@Auth()
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
  create(
    @Body() createAlbumDto: CreateAlbumDto,
    @Me() user: any,
    @Request() req,
  ) {
    console.log('REQUEST', req);
    console.log('ME USER', user);
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
  findOne(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
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
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
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
  remove(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.albumService.remove(id);
  }
}
