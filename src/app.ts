import express from 'express';
import { config as dotEnvConfig } from 'dotenv';
import { DatabaseClient } from './database/client';
import { userRoutes } from './routes/userRoutes';
import { meRoutes } from './routes/meRoutes';

dotEnvConfig();
DatabaseClient.connect();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/me', meRoutes);
app.use('/users', userRoutes);

export default app;
