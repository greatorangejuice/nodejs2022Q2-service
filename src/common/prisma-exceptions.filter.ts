import { BaseExceptionFilter } from '@nestjs/core';
import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { MyLogger } from '../logger/logger.service';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaExceptionsFilter extends BaseExceptionFilter {
  logger = new MyLogger();
  catch(
    exception: Prisma.PrismaClientKnownRequestError | unknown,
    host: ArgumentsHost,
  ) {
    const ctx: HttpArgumentsHost = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: HttpStatus;

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      switch (exception.code) {
        case 'P2003': {
          const status = HttpStatus.NOT_FOUND;
          const message = 'Bad id';
          // @ts-ignore
          response.status(status).json({
            statusCode: status,
            message: message,
          });
          this.logger.error(message);
          break;
        }
        case 'P2011': {
          const status = HttpStatus.BAD_REQUEST;
          const message = exception.message;
          // @ts-ignore
          response.status(status).json({
            statusCode: status,
            message: message,
          });
          this.logger.error(message);
          break;
        }
        case 'P2025': {
          const status = HttpStatus.NOT_FOUND;
          const message = 'Record not found';
          // @ts-ignore
          response.status(status).json({
            statusCode: status,
            message: message,
          });
          this.logger.error(message);
          break;
        }
        default: {
          super.catch(exception, host);
          break;
        }
      }
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const errorResponse: any = exception.getResponse();

      // @ts-ignore
      response.status(status).json(errorResponse);
      this.logger.error(exception.message);
    }
  }
}
