import chalk from 'chalk';
import { disconnect } from 'mongoose';
import { DatabaseClient } from '../src/database/client';
import { UserModel } from '../src/models/userModel';
import { users } from './01-users';

const seedDb = async (): Promise<void> => {
  await DatabaseClient.connect();
  await UserModel.deleteMany();
  await UserModel.insertMany(users);
};

seedDb().then(async () => {
  await disconnect();
  console.log(chalk.bgCyanBright('database seeded successfully'));
});
