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
    return this.store[key].findIndex((item) => {
      return item.id === id;
    });
  }

  async findOne<T>(key, id): Promise<T | null> {
    const item = this.store[key].find((item) => {
      return item.id === id;
    });
    if (item) {
      return item;
    } else {
      throw new HttpException(`${key} is not found`, HttpStatus.NOT_FOUND);
    }
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
      const arrId = await this.getArrayId(key, element.id);
      this.store[key][arrId] = element;
      return await this.store[key][arrId];
    } else {
      throw new Error('User not found');
    }
  }

  async removeElement<T>(key: string, element: any) {
    const dbItem = await this.findOne<T>(key, element.id);
    if (dbItem) {
      const newStore = this.store[key].filter((item) => item.id !== element.id);
      this.store[key] = newStore;
      return true;
    } else {
      return false;
    }
  }
}
