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
import { MyLogger } from '../../logger/logger.service';

@Injectable()
export class FavoritesService {
  constructor(
    @Inject(forwardRef(() => ArtistService))
    private readonly artistService: ArtistService,
    private readonly dbService: InMemoryDbService,
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly prisma: PrismaService,
    private readonly logger: MyLogger,
  ) {}

  async addArtist(id: string) {
    try {
      const artist = await this.artistService.findOne(id);
      const data: Prisma.ArtistFavsUncheckedCreateInput = {
        artistId: id,
        id: '1',
      };
      if (artist) {
        return await this.prisma.artistFavs.create({ data });
      }
      // const data: Prisma.FavoriteArtistsUncheckedCreateInput = {
      //   userId: '51d0835f-86ce-4a15-9d78-5d292d582ef5',
      //   artistId: id,
      // };
      // if (artist) {
      //   return await this.prisma.favoriteArtists.create({ data });
      // }
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        e.status = HttpStatus.UNPROCESSABLE_ENTITY;
      }
      this.logger.error(e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async addAlbum(id: string) {
    try {
      const album = await this.albumService.findOne(id);
      const data: Prisma.AlbumsFavsUncheckedCreateInput = {
        albumId: id,
        id: '1',
      };
      if (album) {
        return this.prisma.albumsFavs.create({ data });
      }
      // const data: Prisma.FavoriteAlbumsUncheckedCreateInput = {
      //   userId: '51d0835f-86ce-4a15-9d78-5d292d582ef5',
      //   albumId: id,
      // };
      // if (artist) {
      //   return await this.prisma.favoriteAlbums.create({ data });
      // }
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        e.status = HttpStatus.UNPROCESSABLE_ENTITY;
      }
      this.logger.error(e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async addTrack(id: string) {
    try {
      const track = await this.trackService.findOne(id);
      const data: Prisma.TracksFavsUncheckedCreateInput = {
        trackId: id,
        id: '1',
      };
      if (track) {
        return await this.prisma.tracksFavs.create({ data });
      }
      // const data: Prisma.FavoriteTracksUncheckedCreateInput = {
      //   userId: '51d0835f-86ce-4a15-9d78-5d292d582ef5',
      //   trackId: id,
      // };
      // if (artist) {
      //   return await this.prisma.favoriteTracks.create({ data });
      // }
    } catch (e) {
      if (e.status === HttpStatus.NOT_FOUND) {
        e.status = HttpStatus.UNPROCESSABLE_ENTITY;
      }
      this.logger.error(e.message);
      throw new HttpException(e.message, e.status);
    }
  }

  async findAll() {
    const artists = await this.prisma.artistFavs.findMany({
      include: { artist: {} },
    });
    const albums = await this.prisma.albumsFavs.findMany({
      include: { album: {} },
    });
    const tracks = await this.prisma.tracksFavs.findMany({
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
    this.logger.verbose('TEST VERBOSE');
    return {
      artists: mappedArtists,
      albums: mappedAlbums,
      tracks: mappedTracks,
    };
  }

  async removeArtist(id: string) {
    try {
      return await this.prisma.artistFavs.delete({ where: { artistId: id } });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async removeTrack(id: string) {
    try {
      return await this.prisma.tracksFavs.delete({ where: { trackId: id } });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async removeAlbum(id: string) {
    try {
      return await this.prisma.albumsFavs.delete({ where: { albumId: id } });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
