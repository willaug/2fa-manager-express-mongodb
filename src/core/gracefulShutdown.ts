import { Server } from 'http';
import { bgRedBright } from 'chalk';
import { DatabaseClient } from './database';

export const gracefulShutdown = (server: Server): void => {
  console.log();
  console.log(bgRedBright('closing server...'));
  server.close(async () => {
    console.log(bgRedBright('server has been closed!'));
    await DatabaseClient.disconnect();
    console.log(bgRedBright('database has been closed!'));
    process.exit(0);
  });
};
