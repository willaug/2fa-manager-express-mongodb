import { MongoClient } from 'mongodb';

class Database {
  private client: MongoClient;

  private readonly dbUrl: string;

  private readonly dbName: string;

  public constructor() {
    this.dbUrl = String(process.env.DATABASE_URL);
    this.dbName = String(process.env.DATABASE_NAME);
    this.client = new MongoClient(this.dbUrl);
  }

  public async connect() {
    await this.client.connect();
  }

  public async disconnect() {
    await this.client.close();
  }

  public async getClientDb() {
    return this.client.db(this.dbName);
  }
}

export const DatabaseClient = new Database();
