import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class RefreshJwtStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(private userService: UsersService) {
    super({
      usernameField: 'login',
      jwtFromRequest: ExtractJwt.fromBodyField('refreshToken'),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_REFRESH_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req) {
    const body = req.body as { login: string; refreshToken: string };
    const user = await this.userService.user({ login: body.login });
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
