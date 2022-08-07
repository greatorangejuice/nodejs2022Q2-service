import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    switch (exception.code) {
      case 'P2003': {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Bad id';
        // @ts-ignore
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      case 'P2011': {
        const status = HttpStatus.BAD_REQUEST;
        const message = exception.message;
        console.log(exception.message);
        // @ts-ignore
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      case 'P2025': {
        const status = HttpStatus.NOT_FOUND;
        const message = 'Record not found';
        // console.log(response.status);
        // @ts-ignore
        response.status(status).json({
          statusCode: status,
          message: message,
        });
        break;
      }
      default: {
        super.catch(exception, host);
        break;
      }
    }
  }
}
