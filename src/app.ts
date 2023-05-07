import express from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { DatabaseClient } from './database/client';
import { userRoutes } from './routes/userRoutes';

dotEnvConfig();
DatabaseClient.connect();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRoutes);

export default app;
