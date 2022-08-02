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
    // const user = await this.userService.getUserWithRolesAndPassword(
    //   req.body.email,
    // );
    // if (!user) {
    //   throw new UnauthorizedException();
    // }
    // return user;
    console.log('Validate in refresh');
    return {
      user: { test: 123 },
    };
  }
}
