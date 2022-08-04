import { MiddlewareConsumer, Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { ConfigModule } from '@nestjs/config';
import { ArtistModule } from './modules/artist/artist.module';
import { TrackModule } from './modules/track/track.module';
import { AlbumModule } from './modules/album/album.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { AppLoggerMiddleware } from './logger/logger.middleware';
import { LoggerModule } from './logger/logger.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    ArtistModule,
    TrackModule,
    AlbumModule,
    FavoritesModule,
    PrismaModule,
    AuthModule,
    LoggerModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(AppLoggerMiddleware).forRoutes('*');
  }
}
