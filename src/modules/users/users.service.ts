import {
  HttpException,
  HttpStatus,
  Injectable,
  LoggerService,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma, User as UserModel } from '@prisma/client';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const time = new Date().getTime();
      const newUser = { ...createUserDto, createdAt: +time, updatedAt: +time };
      const user = await this.prisma.user.create({ data: newUser });
      return plainToInstance(User, user);
    } catch (e) {
      // this.logger.error(e.message);
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<any> {
    try {
      return await this.prisma.user.findMany({
        select: {
          id: true,
          login: true,
          createdAt: true,
          updatedAt: true,
          version: true,
        },
      });
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async findOne(id: string): Promise<UserModel> {
    try {
      return await this.prisma.user.findUniqueOrThrow({
        where: { id },
      });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const oldUser = await this.findOne(id);
      if (oldUser) {
        const comparedPassword = bcrypt.compareSync(
          updateUserDto.oldPassword,
          oldUser.password,
        );

        if (!comparedPassword) {
          throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
        }
        const time = new Date().getTime();
        const newUser = await this.prisma.user.update({
          where: { id },
          data: {
            password: updateUserDto.newPassword,
            version: oldUser.version + 1,
            updatedAt: +time,
          },
        });
        return new User(newUser);
      }
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async remove(id: string) {
    return await this.prisma.user.delete({ where: { id } });
  }

  async users(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async user(userWhereInput: Prisma.UserWhereInput): Promise<User | null> {
    return this.prisma.user.findFirst({
      where: userWhereInput,
    });
  }
}
