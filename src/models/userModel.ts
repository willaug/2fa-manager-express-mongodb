import {
  model,
  Schema,
  Document,
  Model as MongooseModel,
} from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}

class Model {
  private readonly schema: Schema<User>;

  constructor() {
    this.schema = new Schema<User>({
      name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      updatedAt: { type: Date, required: true, default: Date.now },
      createdAt: { type: Date, required: true, default: Date.now },
      password: { type: String, required: true },
    });
  }

  public create(): MongooseModel<User> {
    return model<User>('User', this.schema);
  }
}

export const UserModel = new Model().create();
