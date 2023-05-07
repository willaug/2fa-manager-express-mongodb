import request from 'supertest';
import { disconnect } from 'mongoose';
import validator from 'validator';
import { decode } from 'jsonwebtoken';
import app from '../../src/app';
import { UserModel } from '../../src/models/userModel';

describe('POST /users/authenticate', () => {
  afterAll(() => disconnect());

  it('should return a 200 status code and a valid token', async () => {
    const response = await request(app)
      .post('/users/authenticate')
      .send({
        email: 'example.doe@gmail.com',
        password: 'password123',
      });

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      token: expect.any(String),
    });

    expect(validator.isJWT(response.body.token)).toBe(true);
    expect(decode(response.body.token)).toStrictEqual({
      id: expect.any(String),
      iat: expect.any(Number),
      exp: expect.any(Number),
      email: 'example.doe@gmail.com',
      authenticatedAt: expect.any(String),
    });
  });

  it('should return a 400 status code and error message if user not found', async () => {
    const response = await request(app)
      .post('/users/authenticate')
      .send({
        email: 'will@example.com',
        password: 'password123',
      });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'INVALID_CREDENTIALS',
    });
  });

  it('should return a 400 status code and error message if password not match', async () => {
    const response = await request(app)
      .post('/users/authenticate')
      .send({
        email: 'example.doe@gmail.com',
        password: '1234',

      });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'INVALID_CREDENTIALS',
    });
  });

  it('should return a 400 status code and error message if payload is invalid', async () => {
    const response = await request(app)
      .post('/users/authenticate')
      .send({
        email: 'invalid-email',
      });

    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: 'INVALID_PAYLOAD',
      details: [
        {
          field: 'email',
          error: 'invalidEmail',
        },
        {
          field: 'password',
          error: 'required',
        },
      ],
    });
  });

  it('should return a 500 status code if has internal server error', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => {
      throw new Error('Simulated internal server error');
    });

    const response = await request(app)
      .post('/users/authenticate')
      .send({
        email: 'steve.jobs@gmail.com',
        password: '1234',
      });

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: 'Internal Server Error',
    });
  });
});
