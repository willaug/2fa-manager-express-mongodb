import express from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { DatabaseClient } from './core/database';

dotEnvConfig();
DatabaseClient.connect();
const app = express();

export default app;
