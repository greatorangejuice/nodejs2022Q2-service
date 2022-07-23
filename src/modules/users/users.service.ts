import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { PrismaService } from '../../prisma/prisma.service';
import { User as UserModel } from '@prisma/client';
import { User } from './entities/user.entity';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UsersService {
  constructor(
    private dbService: InMemoryDbService,
    private prisma: PrismaService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const user = await this.prisma.user.create({ data: createUserDto });
      return plainToInstance(User, user);
    } catch (e) {
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
        if (updateUserDto.oldPassword !== oldUser.password) {
          throw new HttpException('Wrong password', HttpStatus.FORBIDDEN);
        }
        const newUser = await this.prisma.user.update({
          where: { id },
          data: {
            password: updateUserDto.newPassword,
            version: oldUser.version + 1,
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
}
