import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from '../../../modules/users/dto/update-user.dto';
import { InMemoryDbService } from '../../modules/in-memory-db/in-memory-db.service';

@Injectable()
export class HandlerService<T> {
  constructor(private dbService: InMemoryDbService) {}

  // async findAll(key: string): Promise<[T]> {
  //   return await this.dbService.findAll(key);
  // }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
