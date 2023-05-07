import request from 'supertest';
import { disconnect } from 'mongoose';
import app from '../src/app';
import { UserModel } from '../src/models/userModel';

describe('POST /users', () => {
  afterAll(() => disconnect());

  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(201);
    expect(response.body).toStrictEqual({
      user: {
        id: expect.any(String),
        name: 'John Doe',
        email: 'johndoe@example.com',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it('should return a 409 status code and error message if email already exists', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Steve Jobs',
        email: 'steve.jobs@gmail.com',
        password: '1234',
      });

    expect(response.status).toBe(409);
    expect(response.body).toEqual({
      errors: [{
        field: 'email',
        error: 'emailAlreadyExists',
      }],
    });
  });

  it('should return a 400 status code and error message if payload is invalid', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        email: 'invalid-email',
        password: 12345,
      });

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      errors: [
        {
          field: 'name',
          error: 'required',
        },
        {
          field: 'email',
          error: 'invalidEmail',
        },
        {
          field: 'password',
          error: 'invalidType',
        },
      ],
    });
  });

  it('should return a 500 status code if has internal server error', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => {
      throw new Error('Simulated internal server error');
    });

    const response = await request(app)
      .post('/users')
      .send({
        name: 'Steve Jobs',
        email: 'steve.jobs@gmail.com',
        password: '1234',
      });

    expect(response.status).toBe(500);
    expect(response.body).toEqual({
      error: 'Internal Server Error',
    });
  });
});
