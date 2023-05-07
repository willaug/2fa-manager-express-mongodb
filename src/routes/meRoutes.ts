import { Router } from 'express';
import { MeController } from '../controllers/meController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = Router();
router.get('/', authMiddleware, MeController.find);

export const meRoutes = router;
