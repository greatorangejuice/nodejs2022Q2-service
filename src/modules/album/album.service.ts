import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { Album } from './entities/album.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { MyLogger } from '../../logger/logger.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private prisma: PrismaService,
    private logger: MyLogger,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const data: Prisma.AlbumCreateManyInput = {
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: createAlbumDto.artistId || undefined,
      };

      return await this.prisma.album.create({ data });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Album[]> {
    try {
      return await this.prisma.album.findMany();
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Album> {
    try {
      return await this.prisma.album.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let data: Prisma.AlbumUncheckedUpdateInput = {
      name: updateAlbumDto.name,
      year: updateAlbumDto.year,
      artistId: updateAlbumDto.artistId || undefined,
    };
    if (updateAlbumDto.artistId === '' || updateAlbumDto.artistId === null) {
      data = {
        ...data,
        artistId: { set: null },
      };
    }
    return await this.prisma.album.update({
      where: { id },
      data: {
        ...data,
      },
    });
  }

  async remove(id: string) {
    try {
      const oldAlbum = await this.findOne(id);
      if (oldAlbum) {
        return await this.prisma.album.delete({ where: { id } });
      }
      this.logger.log('remove album');
    } catch (e) {
      this.logger.error(e.message);
      throw new HttpException(e.message, e.status);
    }
  }
}
