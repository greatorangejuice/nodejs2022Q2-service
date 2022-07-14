import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { User } from './entities/user.entity';
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';
import { IStoreKey } from '../../common/common.models';

@Injectable()
export class UsersService {
  constructor(private dbService: InMemoryDbService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // check user is exists
      const user = new User(createUserDto);
      const time = new Date().getTime();
      user.version = 1;
      user.id = uuidv4();
      user.createdAt = +time;
      user.updatedAt = +time;
      return await this.dbService.addElement<User>(IStoreKey.user, user);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.dbService.findAll<User>(IStoreKey.user);
  }

  async findOne(id: string) {
    try {
      if (!uuidValidate(id)) {
        throw new HttpException('id is not valid', HttpStatus.BAD_REQUEST);
      }
      return await this.dbService.findOne<User>(IStoreKey.user, id);
    } catch (e) {
      throw new HttpException(e.message, e.status);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      const oldUser = await this.dbService.findOne<User>(IStoreKey.user, id);
      if (oldUser && updateUserDto.oldPassword === oldUser.password) {
        const newUser: User = {
          ...oldUser,
          password: updateUserDto.newPassword,
          updatedAt: +new Date().getTime(),
        };
        return await this.dbService.updateElement<User>(
          IStoreKey.user,
          newUser,
        );
      }
    } catch (e) {
      return new HttpException(e.message, HttpStatus.NOT_FOUND);
    }
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
