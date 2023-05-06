import { bgGreenBright } from 'chalk';
import app from './app';
import { gracefulShutdown } from './core/gracefulShutdown';

const server = app.listen(process.env.API_PORT, () => {
  console.log();
  console.log(bgGreenBright(`2FA Manager API is now running on "http://localhost:${process.env.API_PORT}"`));
});

process.on('SIGINT', () => gracefulShutdown(server));
process.on('SIGQUIT', () => gracefulShutdown(server));
process.on('SIGTERM', () => gracefulShutdown(server));
