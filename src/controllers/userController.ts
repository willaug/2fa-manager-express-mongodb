import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { compare, genSalt, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { UserModel } from '../models/userModel';
import { validateBody } from '../core/validateBody';

export class UserController {
  public static async create(req: Request, res: Response): Promise<void> {
    const errors = validateBody(req.body, {
      name: { type: 'string', isRequired: true },
      email: { type: 'string', isRequired: true, isEmail: true },
      password: { type: 'string', isRequired: true },
    });

    if (errors) {
      res.status(400).json(errors);
      return;
    }

    try {
      const existingUser = await UserModel.findOne({ email: req.body.email });
      if (existingUser) {
        res.status(409).json({
          error: 'EMAIL_ALREADY_EXISTS',
          details: [
            {
              field: 'email',
              error: 'unique',
            },
          ],
        });

        return;
      }

      const salt = await genSalt(10);
      const encryptedPassword = await hash(req.body.password, salt);

      const model = new UserModel({
        name: req.body.name,
        email: req.body.email,
        password: encryptedPassword,
      });

      const savedUser = await model.save();
      res.status(201).json({
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          createdAt: savedUser.createdAt,
          updatedAt: savedUser.updatedAt,
        },
      });
    } catch (err) {
      res.status(500).json({ error: STATUS_CODES[500] });
    }
  }

  public static async authenticate(req: Request, res: Response): Promise<void> {
    const errors = validateBody(req.body, {
      email: { type: 'string', isRequired: true, isEmail: true },
      password: { type: 'string', isRequired: true },
    });

    if (errors) {
      res.status(400).json(errors);
      return;
    }

    try {
      const user = await UserModel.findOne({ email: req.body.email });
      if (!user) {
        res.status(400).json({ error: 'INVALID_CREDENTIALS' });
        return;
      }

      const match = await compare(req.body.password, user.password);
      if (!match) {
        res.status(400).json({ error: 'INVALID_CREDENTIALS' });
        return;
      }

      const payload = {
        id: user._id,
        email: user.email,
        authenticatedAt: new Date().toISOString(),
      };

      const authenticationOptions = { expiresIn: process.env.AUTH_DURATION };
      const token = sign(payload, String(process.env.AUTH_SECRET_KEY), authenticationOptions);

      res.status(200).json({ token });
    } catch (err) {
      res.status(500).json({ error: STATUS_CODES[500] });
    }
  }
}
