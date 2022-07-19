import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { IStoreKey } from '../../common/common.models';
import { Artist } from './entities/artist.entity';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Artist as ArtistModel } from '@prisma/client';

@Injectable()
export class ArtistService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly dbService: InMemoryDbService,
    private readonly prisma: PrismaService,
  ) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistModel> {
    try {
      return await this.prisma.artist.create({ data: createArtistDto });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<ArtistModel[]> {
    try {
      return await this.prisma.artist.findMany();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<ArtistModel> {
    try {
      return await this.prisma.artist.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    return await this.prisma.artist.update({
      where: { id },
      data: { ...updateArtistDto },
    });
  }

  async remove(id: string) {
    return await this.prisma.artist.delete({ where: { id } });
    // try {
    //   const oldArtist = await this.findOne(id);
    //   if (oldArtist) {
    //     const albumFilter = {
    //       storeField: IStoreKey.album,
    //       id,
    //       cb: (item) => {
    //         if (item.artistId === id) {
    //           item.artistId = null;
    //         }
    //       },
    //     };
    //     await this.dbService.loopInStore(albumFilter);
    //     const trackFilter = {
    //       storeField: IStoreKey.track,
    //       id,
    //       cb: (item) => {
    //         if (item.artistId === id) {
    //           item.artistId = null;
    //         }
    //       },
    //     };
    //     await this.dbService.loopInStore(trackFilter);
    //     await this.favoritesService.remove(id, IStoreKey.artist);
    //     await this.dbService.removeElement<Artist>(IStoreKey.artist, oldArtist);
    //     return { removed: true };
    //   }
    // } catch (e) {
    //   throw new HttpException(e.message, e.status);
    // }
  }
}
