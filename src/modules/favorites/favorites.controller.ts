import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { IStoreKey } from '../../common/common.models';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  async addTrack(@Param('id') id: string) {
    return await this.favoritesService.create(id, IStoreKey.track);
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrack(@Param('id') id: string) {
    return this.favoritesService.remove(id, IStoreKey.track);
  }

  @Post('album/:id')
  async addAlbum(@Param('id') id: string) {
    return await this.favoritesService.create(id, IStoreKey.album);
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbum(@Param('id') id: string) {
    return this.favoritesService.remove(id, IStoreKey.album);
  }

  @Post('artist/:id')
  async addArtist(@Param('id') id: string) {
    return await this.favoritesService.create(id, IStoreKey.artist);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtist(@Param('id') id: string) {
    return this.favoritesService.remove(id, IStoreKey.artist);
  }
}
