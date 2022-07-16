import { forwardRef, Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { InMemoryDbModule } from '../../common/modules/in-memory-db/in-memory-db.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [InMemoryDbModule, forwardRef(() => FavoritesModule)],
  controllers: [AlbumController],
  providers: [AlbumService],
  exports: [AlbumService],
})
export class AlbumModule {}
