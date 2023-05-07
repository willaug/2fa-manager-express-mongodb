import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
router.post('/', UserController.create);
router.post('/authenticate', UserController.authenticate);

export const userRoutes = router;
