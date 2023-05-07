import { Server } from 'http';
import { bgRedBright } from 'chalk';
import { disconnect } from 'mongoose';

export const gracefulShutdown = (server: Server): void => {
  console.log();
  console.log(bgRedBright('closing server...'));
  server.close(async () => {
    console.log(bgRedBright('server has been closed!'));
    await disconnect();
    console.log(bgRedBright('database has been disconnected!'));
    process.exit(0);
  });
};
