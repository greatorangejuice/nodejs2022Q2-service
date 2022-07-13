import { Exclude } from 'class-transformer';

export class User {
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  id: string;
  login: string;
  @Exclude()
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}
