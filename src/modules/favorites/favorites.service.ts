import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IStoreKey } from '../../common/common.models';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { TrackService } from '../track/track.service';
import { ArtistService } from '../artist/artist.service';
import { AlbumService } from '../album/album.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    private readonly dbService: InMemoryDbService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly prisma: PrismaService,
  ) {}

  async addArtist(id: string) {
    try {
      const artist = await this.artistService.findOne(id);
      const data: Prisma.FavoriteArtistsUncheckedCreateInput = {
        userId: '51d0835f-86ce-4a15-9d78-5d292d582ef5',
        artistId: id,
      };
      if (artist) {
        return await this.prisma.favoriteArtists.create({ data });
      }
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        e.status = HttpStatus.UNPROCESSABLE_ENTITY;
      }
      throw new HttpException(e.message, e.status);
    }
  }

  async addAlbum(id: string) {
    try {
      const artist = await this.albumService.findOne(id);
      const data: Prisma.FavoriteAlbumsUncheckedCreateInput = {
        userId: '51d0835f-86ce-4a15-9d78-5d292d582ef5',
        albumId: id,
      };
      if (artist) {
        return await this.prisma.favoriteAlbums.create({ data });
      }
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        e.status = HttpStatus.UNPROCESSABLE_ENTITY;
      }
      throw new HttpException(e.message, e.status);
    }
  }

  async addTrack(id: string) {
    try {
      const artist = await this.trackService.findOne(id);
      const data: Prisma.FavoriteTracksUncheckedCreateInput = {
        userId: '51d0835f-86ce-4a15-9d78-5d292d582ef5',
        trackId: id,
      };
      if (artist) {
        return await this.prisma.favoriteTracks.create({ data });
      }
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        e.status = HttpStatus.UNPROCESSABLE_ENTITY;
      }
      throw new HttpException(e.message, e.status);
    }
  }

  async findAll() {
    const artists = await this.prisma.favoriteArtists.findMany({
      include: { artist: {} },
    });
    const albums = await this.prisma.favoriteAlbums.findMany({
      include: { album: {} },
    });
    const tracks = await this.prisma.favoriteTracks.findMany({
      include: { track: {} },
    });
    const mappedArtists = artists.map((artist) => {
      return artist.artist;
    });
    const mappedAlbums = albums.map((album) => {
      return album.album;
    });
    const mappedTracks = tracks.map((track) => {
      return track.track;
    });
    return {
      artists: mappedArtists,
      albums: mappedAlbums,
      tracks: mappedTracks,
    };
  }

  async remove(id: string, key: IStoreKey) {
    try {
      return await this.dbService.removeFavorite(key, id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
