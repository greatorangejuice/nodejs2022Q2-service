import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    this.$use(async (params, next) => {
      if (
        (params.action == 'create' || params.action === 'update') &&
        params.model == 'User'
      ) {
        const user = params.args.data;
        const saltRounds = process.env.CRYPT_SALT;
        const salt = bcrypt.genSaltSync(
          typeof saltRounds === 'number' ? saltRounds : 10,
        );
        user.password = bcrypt.hashSync(user.password, salt);
        params.args.data = user;
      }
      return next(params);
    });
  }
}
