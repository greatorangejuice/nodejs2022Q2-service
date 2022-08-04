import { Injectable, Scope, ConsoleLogger, LogLevel } from '@nestjs/common';

@Injectable({ scope: Scope.TRANSIENT })
export class MyLogger extends ConsoleLogger {
  public levels: Array<LogLevel> = ['error', 'warn', 'log', 'verbose', 'debug'];

  constructor() {
    super();
    this.setLogLevels(this.levels);
  }

  customLog() {
    this.log('Please feed the cat!');
  }

  error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
  }

  warn(message: any, context?: string) {
    super.warn(message, context);
  }

  setLogLevels(levels: LogLevel[]) {
    super.setLogLevels(levels);
  }
}
