import { forwardRef, Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { InMemoryDbModule } from '../../common/modules/in-memory-db/in-memory-db.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [InMemoryDbModule, forwardRef(() => FavoritesModule)],
  controllers: [ArtistController],
  providers: [ArtistService],
  exports: [ArtistService],
})
export class ArtistModule {}
