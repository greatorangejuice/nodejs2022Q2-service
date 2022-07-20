import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { IStoreKey } from '../../common/common.models';
import { Album } from './entities/album.entity';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly dbService: InMemoryDbService,
    private prisma: PrismaService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const data: Prisma.AlbumCreateInput = {
        name: createAlbumDto.name,
        year: createAlbumDto.year,
      };
      return await this.prisma.album.create({
        data: {
          ...data,
          artist: {
            connect: { id: createAlbumDto.artistId },
          },
        },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Album[]> {
    try {
      return await this.prisma.album.findMany();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Album> {
    try {
      return await this.prisma.album.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    const data: Prisma.AlbumCreateInput = {
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
    };
    return await this.prisma.album.update({
      where: { id },
      data: {
        ...data,
        artist: {
          connect: { id: updateAlbumDto.artistId },
        },
      },
    });
  }

  async remove(id: string) {
    try {
      const oldAlbum = await this.findOne(id);
      if (oldAlbum) {
        const filter = {
          storeField: IStoreKey.track,
          id,
          cb: (item) => {
            if (item.albumId === id) {
              item.albumId = null;
            }
          },
        };
        await this.favoritesService.remove(id, IStoreKey.album);
        await this.dbService.loopInStore(filter);
        await this.dbService.removeElement<Album>(IStoreKey.album, oldAlbum);

        return { removed: true };
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
