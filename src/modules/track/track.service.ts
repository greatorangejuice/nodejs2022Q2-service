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
import { v4 as uuidv4 } from 'uuid';
import { IStoreKey } from '../../common/common.models';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class TrackService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly dbService: InMemoryDbService,
  ) {}

  async create(createTrackDto: CreateTrackDto): Promise<Track> {
    try {
      const track = new Track(createTrackDto);
      track.id = uuidv4();

      return await this.dbService.addElement<Track>(IStoreKey.track, track);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Track[]> {
    try {
      return await this.dbService.findAll<Track>(IStoreKey.track);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {
      return await this.dbService.findOne<Track>(IStoreKey.track, id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    try {
      const oldTrack = await this.findOne(id);
      if (oldTrack) {
        const newTrack = new Track({ ...oldTrack, ...updateTrackDto });
        return await this.dbService.updateElement<Track>(
          IStoreKey.track,
          newTrack,
        );
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async remove(id: string) {
    try {
      const oldTrack = await this.findOne(id);
      if (oldTrack) {
        await this.favoritesService.remove(id, IStoreKey.track);
        await this.dbService.removeElement<Track>(IStoreKey.track, oldTrack);
        return { removed: true };
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
