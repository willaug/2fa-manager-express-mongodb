import { Response } from 'express';
import { STATUS_CODES } from 'http';
import { UserModel } from '../models/userModel';
import { AuthRequest } from '../middlewares/authMiddleware';

export class MeController {
  public static async find(req: AuthRequest, res: Response): Promise<void> {
    try {
      const user = await UserModel.findOne({
        _id: req.authenticatedUser && req.authenticatedUser.id,
      });

      if (!user) {
        res.status(404).json({ error: 'USER_NOT_FOUND' });
        return;
      }

      res.status(200).json({
        me: {
          id: user._id,
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
      });
    } catch (err) {
      res.status(500).json({ error: STATUS_CODES[500] });
    }
  }
}
