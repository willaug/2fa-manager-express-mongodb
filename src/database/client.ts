import { connect } from 'mongoose';
import { config as dotEnvConfig } from 'dotenv';

class Database {
  private readonly dbUrl: string;

  public constructor() {
    dotEnvConfig();
    this.dbUrl = this.createDbUrl();
  }

  public async connect(): Promise<void> {
    await connect(this.dbUrl);
  }

  private createDbUrl(): string {
    const params = [
      'mongodb://',
      process.env.DATABASE_USERNAME,
      ':',
      process.env.DATABASE_PASSWORD,
      '@',
      process.env.DATABASE_HOST,
      ':',
      process.env.DATABASE_PORT,
      '/',
      process.env.DATABASE_NAME,
      '?authSource=admin',
    ];

    return params.join('');
  }
}

export const DatabaseClient = new Database();
