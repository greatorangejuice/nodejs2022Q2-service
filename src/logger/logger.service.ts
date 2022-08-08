import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { writeLog } from './utils';

@Injectable()
export class MyLogger extends ConsoleLogger {
  constructor() {
    const levels: Array<LogLevel> = [
      'error',
      'warn',
      'log',
      'verbose',
      'debug',
    ];
    const LOG_LEVEL = parseInt(process.env.LOG_LEVEL) || 4;

    super();
    this.setLogLevels(levels.slice(0, LOG_LEVEL));
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    writeLog(message + '\n');
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
    writeLog(message + '\n');
  }

  log(message: any, ...optionalParams: any[]): any {
    super.log(message, ...optionalParams);
    writeLog(message + '\n');
  }

  debug(message: any, context?: string) {
    super.debug(message, context);
    writeLog(message + '\n');
  }

  verbose(message: any, context?: string) {
    super.verbose(message, context);
    writeLog(message + '\n');
  }
}
