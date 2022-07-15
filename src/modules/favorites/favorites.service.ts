import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { IStoreKey } from '../../common/common.models';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from '../track/track.service';
import { Track } from '../track/entities/track.entity';
import { Album } from '../album/entities/album.entity';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { Artist } from '../artist/entities/artist.entity';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly dbService: InMemoryDbService,
    private readonly trackService: TrackService,
    private readonly artistService: ArtistService,
    private readonly albumService: AlbumService,
  ) {}

  async create(id: string, key: IStoreKey) {
    try {
      switch (key) {
        case IStoreKey.track:
          {
            const track = await this.trackService.findOne(id);
            if (track) {
              return await this.dbService.addFavorite(key, id);
            }
          }
          break;
        case IStoreKey.album:
          {
            const album = await this.albumService.findOne(id);
            if (album) {
              return await this.dbService.addFavorite(key, id);
            }
          }
          break;
        case IStoreKey.artist: {
          const artist = await this.artistService.findOne(id);
          if (artist) {
            return await this.dbService.addFavorite(key, id);
          }
        }
      }
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        e.status = HttpStatus.UNPROCESSABLE_ENTITY;
      }
      throw new HttpException(e.message, e.status);
    }
  }

  async findAll() {
    try {
      const ids = (await this.dbService.findAllFavorites<Favorite>(
        IStoreKey.favorites,
      )) as Favorite;
      const response = {
        artists: [],
        tracks: [],
        albums: [],
      };

      const tracks = [];
      ids.tracks.forEach((id) => {
        tracks.push(this.dbService.findOne<Track>(IStoreKey.track, id));
      });
      await Promise.all(tracks).then((items) => {
        response.tracks.push(...items);
      });

      const albums = [];
      ids.albums.forEach((id) => {
        albums.push(this.dbService.findOne<Album>(IStoreKey.album, id));
      });
      await Promise.all(albums).then((items) => {
        response.albums.push(...items);
      });

      const artists = [];
      ids.artists.forEach((id) => {
        artists.push(this.dbService.findOne<Artist>(IStoreKey.artist, id));
      });
      await Promise.all(artists).then((items) => {
        console.log('Artists: ', items);
        response.artists.push(...items);
      });
      return response;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: string, key: IStoreKey) {
    try {
      return await this.dbService.removeFavorite(key, id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
