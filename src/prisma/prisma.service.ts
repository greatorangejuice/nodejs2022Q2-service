import { Global, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    console.log('Prisma construztor');
    super();
  }
  async onModuleInit() {
    console.log('Module init?');
    await this.$connect();
  }
}
