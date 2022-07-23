import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IStoreKey } from '../../common/common.models';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Favorite } from './entities/favorite.entity';

@Controller('favs')
@ApiTags('Favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ description: 'Get all favorites' })
  @ApiResponse({
    status: 200,
    description: 'Get all favorites',
    type: Favorite,
  })
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @ApiOperation({ description: 'Add track to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Add track to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Track is not found',
  })
  async addTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ description: 'Remove track from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Remove track from favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. trackId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Track is not found',
  })
  removeTrack(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ description: 'Add album to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Add album to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Album is not found',
  })
  async addAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ description: 'Remove album from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Remove album from favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. albumId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Album is not found',
  })
  removeAlbum(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ description: 'Add artist to favorites' })
  @ApiResponse({
    status: 201,
    description: 'Add artist to favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 422,
    description: 'Artist is not found',
  })
  async addArtist(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    return await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ description: 'Remove artist from favorites' })
  @ApiResponse({
    status: 204,
    description: 'Remove artist from favorites',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request. artistId is invalid (not uuid)',
  })
  @ApiResponse({
    status: 404,
    description: 'Artist is not found',
  })
  removeArtist(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    return this.favoritesService.removeArtist(id);
  }
}
