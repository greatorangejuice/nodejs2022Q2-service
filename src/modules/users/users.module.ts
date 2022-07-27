import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { InMemoryDbModule } from '../../common/modules/in-memory-db/in-memory-db.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [InMemoryDbModule, PrismaModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
