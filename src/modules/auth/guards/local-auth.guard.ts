import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginUserDto } from '../dto/login.dto';
import { validate } from 'class-validator';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  canActivate(context: ExecutionContext) {
    // // console.log('constext', context.switchToHttp());
    // const userCredentials = context.switchToHttp().getRequest().body;
    // const candidate = new LoginUserDto(userCredentials);
    //
    // validate(candidate).then((errors) => {
    //   if (errors.length > 0) {
    //     console.log('Errors', errors);
    //     throw new HttpException(errors[0].constraints, HttpStatus.BAD_REQUEST);
    //   }
    // });
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }
}
