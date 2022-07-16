import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryDbModule } from '../../common/modules/in-memory-db/in-memory-db.module';
import { ArtistModule } from '../artist/artist.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  imports: [InMemoryDbModule, forwardRef(() => FavoritesModule)],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
