import { forwardRef, Module } from '@nestjs/common';
import { TrackService } from './track.service';
import { TrackController } from './track.controller';
import { InMemoryDbModule } from '../../common/modules/in-memory-db/in-memory-db.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaModule } from '../../prisma/prisma.module';
import { LoggerModule } from '../../logger/logger.module';

@Module({
  imports: [
    InMemoryDbModule,
    forwardRef(() => FavoritesModule),
    PrismaModule,
    LoggerModule,
  ],
  controllers: [TrackController],
  providers: [TrackService],
  exports: [TrackService],
})
export class TrackModule {}
