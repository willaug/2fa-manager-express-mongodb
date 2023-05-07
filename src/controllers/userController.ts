import { Request, Response } from 'express';
import { STATUS_CODES } from 'http';
import { genSalt, hash } from 'bcrypt';
import { User, UserModel } from '../models/userModel';
import { validateBody } from '../core/validateBody';

export class UserController {
  public static async create(req: Request, res: Response): Promise<Partial<User> | void> {
    const errors = validateBody(req.body, {
      name: { type: 'string', isRequired: true },
      email: { type: 'string', isRequired: true, isEmail: true },
      password: { type: 'string', isRequired: true },
    });

    if (errors.length) {
      res.status(400).json({ errors });
      return;
    }

    try {
      const existingUser = await UserModel.findOne({ email: req.body.email });
      if (existingUser) {
        res.status(409).json({
          errors: [{
            field: 'email',
            error: 'emailAlreadyExists',
          }],
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
}
