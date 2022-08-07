import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(login: string, password: string): Promise<any> {
    try {
      const user = await this.userService.user({ login });
      if (!user) {
        throw 'user not found';
      }
      const comparedPassword = bcrypt.compareSync(password, user.password);

      if (comparedPassword) {
        return user;
      }
      return null;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.CONFLICT);
    }
  }

  async signup(userCreds: LoginUserDto) {
    return await this.userService.create(userCreds);
  }

  async login(userCreds: LoginUserDto) {
    const user = await this.userService.user({ login: userCreds.login });
    const { id, login } = user;
    const payload = {
      id,
      login,
      key: process.env.JWT_SECRET_KEY,
    };
    return {
      accessToken: this.jwtService.sign(payload),
      refreshToken: this.jwtService.sign(
        { token: 'refreshToken' },
        {
          expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME,
          secret: process.env.JWT_SECRET_REFRESH_KEY,
        },
      ),
    };
  }
}
