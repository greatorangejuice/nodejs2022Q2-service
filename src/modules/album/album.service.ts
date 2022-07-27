import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { v4 as uuidv4 } from 'uuid';
import { IStoreKey } from '../../common/common.models';
import { Album } from './entities/album.entity';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { FavoritesService } from '../favorites/favorites.service';

@Injectable()
export class AlbumService {
  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private readonly favoritesService: FavoritesService,
    private readonly dbService: InMemoryDbService, // private readonly favService: FavoritesService,
  ) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<Album> {
    try {
      const album = new Album(createAlbumDto);
      album.id = uuidv4();

      return await this.dbService.addElement<Album>(IStoreKey.album, album);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Album[]> {
    try {
      return await this.dbService.findAll<Album>(IStoreKey.album);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Album> {
    try {
      return await this.dbService.findOne<Album>(IStoreKey.album, id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    try {
      const oldAlbum = await this.findOne(id);
      if (oldAlbum) {
        const newAlbum = new Album({ ...oldAlbum, ...updateAlbumDto });
        return await this.dbService.updateElement<Album>(
          IStoreKey.album,
          newAlbum,
        );
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
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
