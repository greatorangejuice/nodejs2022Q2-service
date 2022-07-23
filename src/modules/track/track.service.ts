import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { Track } from './entities/track.entity';
import { IStoreKey } from '../../common/common.models';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { FavoritesService } from '../favorites/favorites.service';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, Track as TrackModel } from '@prisma/client';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private prisma: PrismaService,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackModel> {
    try {
      const data: Prisma.TrackCreateManyInput = {
        name: createTrackDto.name,
        duration: createTrackDto.duration,
        albumId: createTrackDto.albumId || undefined,
        artistId: createTrackDto.artistId || undefined,
      };
      return await this.prisma.track.create({ data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<TrackModel[]> {
    try {
      return await this.prisma.track.findMany();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.prisma.track.findUniqueOrThrow({ where: { id } });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const oldTrack = await this.findOne(id);

      let data: Prisma.TrackUncheckedUpdateInput = {
        ...updateTrackDto,
      };

      if (updateTrackDto.artistId === '' || updateTrackDto.artistId === null) {
        data = { ...data, artistId: { set: null } };
      }

      if (updateTrackDto.albumId === '' || updateTrackDto.albumId === null) {
        data = { ...data, albumId: { set: null } };
      }

      if (oldTrack) {
        return await this.prisma.track.update({ where: { id }, data });
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async remove(id: string) {
    try {
      const oldTrack = await this.findOne(id);
      if (oldTrack) {
        return await this.prisma.track.delete({ where: { id } });
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
