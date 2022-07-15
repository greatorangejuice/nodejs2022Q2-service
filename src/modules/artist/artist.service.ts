import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { v4 as uuidv4 } from 'uuid';
import { IStoreKey } from '../../common/common.models';
import { Artist } from './entities/artist.entity';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';

@Injectable()
export class ArtistService {
  constructor(private readonly dbService: InMemoryDbService) {}

  async create(createArtistDto: CreateArtistDto) {
    try {
      const artist = new Artist(createArtistDto);
      artist.id = uuidv4();

      return await this.dbService.addElement<Artist>(IStoreKey.artist, artist);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<Artist[]> {
    try {
      return await this.dbService.findAll<Artist>(IStoreKey.artist);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Artist> {
    try {
      return await this.dbService.findOne<Artist>(IStoreKey.artist, id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto): Promise<Artist> {
    try {
      const oldArtist = await this.findOne(id);
      if (oldArtist) {
        const newArtist = new Artist({ ...oldArtist, ...updateArtistDto });
        return await this.dbService.updateElement<Artist>(
          IStoreKey.artist,
          newArtist,
        );
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async remove(id: string) {
    try {
      const oldArtist = await this.findOne(id);
      if (oldArtist) {
        const albumFilter = {
          storeField: IStoreKey.album,
          id,
          cb: (item) => {
            if (item.artistId === id) {
              item.artistId = null;
            }
          },
        };
        await this.dbService.loopInStore(albumFilter);
        const trackFilter = {
          storeField: IStoreKey.track,
          id,
          cb: (item) => {
            if (item.artistId === id) {
              item.artistId = null;
            }
          },
        };
        await this.dbService.loopInStore(trackFilter);
        await this.dbService.removeElement<Artist>(IStoreKey.artist, oldArtist);
        return { removed: true };
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }
}
