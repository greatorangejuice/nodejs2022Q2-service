import { BaseExceptionFilter } from '@nestjs/core';
import { ArgumentsHost, Catch, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class PrismaExceptionsFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    console.log('CATCH PRISMA ERROR');
    // (error instanceof Prisma.PrismaClientKnownRequestError)
    switch (exception.code) {
      case '2002': {
        console.log('2002');

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
