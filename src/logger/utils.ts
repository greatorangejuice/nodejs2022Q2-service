import * as fs from 'fs';

export const addUnhandledExceptionHandler = (): void => {
  process
    .on('unhandledRejection', () => {
      process.stdout.write('Unhandled Rejection at Promise');
    })
    .on('uncaughtException', () => {
      process.stdout.write('Uncaught Exception thrown');
      process.exit(1);
    });
};

export const writeLog = (logData: string): void => {
  const folder: string = process.env.LOGS_FOLDER;

  fs.readdir(folder, (err, files: string[]) => {
    if (err) {
      const newLogsPath = getNewPath(folder);
      createFolder(folder);
      writeLogInFile(newLogsPath, logData);
    }
    (files || []).forEach((file: string) => {
      const path = `${folder}/${file}`;
      writeLogInFile(path, logData);
    });
  });
};

const getNewPath = (path: string): string => {
  const fileName = new Date().valueOf();
  return `${path}/${fileName}.log`;
};

const writeLogInFile = (logName: string, logData: string) => {
  fs.appendFile(logName, logData, 'utf8', (error) => {
    if (error) throw new Error(error.message);
  });
};

const createFolder = (logsFolder: string): void => {
  fs.mkdir(logsFolder, { recursive: true }, (error) => {
    if (error) throw Error(error.message);
  });
};
