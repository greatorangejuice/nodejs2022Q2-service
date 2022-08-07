import { forwardRef, Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { InMemoryDbModule } from '../../common/modules/in-memory-db/in-memory-db.module';
import { TrackModule } from '../track/track.module';
import { ArtistModule } from '../artist/artist.module';
import { AlbumModule } from '../album/album.module';
import { FavoritesService } from './favorites.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [
    InMemoryDbModule,
    forwardRef(() => TrackModule),
    forwardRef(() => ArtistModule),
    forwardRef(() => AlbumModule),
    PrismaModule,
    LoggerModule,
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService],
  exports: [FavoritesService],
})
export class FavoritesModule {}
