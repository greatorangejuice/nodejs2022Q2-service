import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { User } from '../users/entities/user.entity';
import { LoginUserDto } from './dto/login.dto';
import { validate as validateClass } from 'class-validator';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    console.log('Constructor passport strategy');
    super({ usernameField: 'login' });
  }

  async validate(login, password): Promise<User> {
    console.log('In validate');

    const user = await this.authService.validateUser(login, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
