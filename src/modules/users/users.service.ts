import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InMemoryDbService } from '../../common/modules/in-memory-db/in-memory-db.service';
import { User } from './entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { IStoreKey } from '../../common/common.models';

@Injectable()
export class UsersService {
  constructor(private dbService: InMemoryDbService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      // check user is exists
      const user = new User(createUserDto);
      user.version = 1;
      user.id = uuidv4();
      user.createdAt = new Date().getTime();
      return await this.dbService.addElement<User>(IStoreKey.user, user);
    } catch (e) {
      return new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<User[]> {
    return await this.dbService.findAll<User>(IStoreKey.user);
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const oldUser = await this.dbService.findOne<User>(
        IStoreKey.user,
        updateUserDto.id,
      );
      if (oldUser) {
        const newUser: User = {
          ...oldUser,
          ...updateUserDto,
          updatedAt: new Date().getTime(),
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
