import { Db, MongoClient } from 'mongodb';
import { config as dotEnvConfig } from 'dotenv';

class Database {
  private readonly dbUrl: string;

  private readonly dbName: string;

  private client: MongoClient;

  public constructor() {
    dotEnvConfig();
    this.dbUrl = String(process.env.DATABASE_URL);
    this.dbName = String(process.env.DATABASE_NAME);
    this.client = new MongoClient(this.dbUrl);
  }

  public async connect(): Promise<void> {
    await this.client.connect();
  }

  public async disconnect(): Promise<void> {
    await this.client.close();
  }

  public async getClientDb(): Promise<Db> {
    return this.client.db(this.dbName);
  }
}

export const DatabaseClient = new Database();
