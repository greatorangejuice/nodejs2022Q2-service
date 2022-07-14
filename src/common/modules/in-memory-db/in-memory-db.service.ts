import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class InMemoryDbService {
  store = {
    users: [],
    artists: [],
  };

  cash = {
    users: {},
  };

  async getArrayId(key, id) {
    return this.store[key].indexOf(id);
  }

  async findOne<T>(key, id): Promise<T | null> {
    const item = this.store[key].find((item) => {
      return item.id === id;
    });
    if (!item) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  async findAll<T>(key: string): Promise<Array<T>> {
    return this.store[key];
  }

  async addElement<T>(key: string, element: T) {
    this.store[key].push(element);
    const length = this.store[key].length;
    return this.store[key][length - 1];
  }

  async updateElement<T>(key: string, element: any) {
    const dbItem = await this.findOne<T>(key, element.id);
    if (dbItem) {
      const arrId = this.getArrayId(key, element.id);
      this.store[key][arrId] = element;
      return element;
    } else {
      throw new Error('User not found');
    }
  }
}
