import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryDbModule } from '../../common/modules/in-memory-db/in-memory-db.module';
import { ArtistModule } from '../artist/artist.module';

@Module({
  imports: [InMemoryDbModule, forwardRef(() => ArtistModule)],
  controllers: [TrackController],
  providers: [TrackService],
})
export class TrackModule {}
