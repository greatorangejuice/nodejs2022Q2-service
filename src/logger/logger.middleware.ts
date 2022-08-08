import { Injectable, NestMiddleware, Logger } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import { MyLogger } from './logger.service';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  constructor(private logger: MyLogger) {}

  use(request: Request, response: Response, next: NextFunction): void {
    const { ip, method, path: url, body, headers } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${ip}, ${JSON.stringify(
          body,
        )}`,
        'HTTP',
      );
    });

    next();
  }
}
