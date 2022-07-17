import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
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
  async addTrack(@Param('id') id: string) {
    return await this.favoritesService.create(id, IStoreKey.track);
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
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.remove(id, IStoreKey.track);
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
  async addAlbum(@Param('id') id: string) {
    return await this.favoritesService.create(id, IStoreKey.album);
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
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.remove(id, IStoreKey.album);
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
  async addArtist(@Param('id') id: string) {
    return await this.favoritesService.create(id, IStoreKey.artist);
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
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.remove(id, IStoreKey.artist);
  }
}
