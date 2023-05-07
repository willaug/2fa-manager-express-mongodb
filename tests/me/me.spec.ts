import request from 'supertest';
import { disconnect } from 'mongoose';
import app from '../../src/app';
import { validAuthenticationToken, validAuthenticationTokenWithoutUser } from '../helpers/authentication';
import { UserModel } from '../../src/models/userModel';

describe('GET /me', () => {
  afterAll(() => disconnect());

  it('should return a 200 status code and data from user', async () => {
    const response = await request(app)
      .get('/me')
      .set('Authorization', validAuthenticationToken())
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({
      me: {
        id: '6457f31e39a28456089eaa0d',
        name: 'Example Doe',
        email: 'example.doe@gmail.com',
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    });
  });

  it('should return a 404 status code if has not find user', async () => {
    const response = await request(app)
      .get('/me')
      .set('Authorization', validAuthenticationTokenWithoutUser())
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(404);
    expect(response.body).toStrictEqual({
      error: 'USER_NOT_FOUND',
    });
  });

  it('should return a 401 status code if token is missing', async () => {
    const response = await request(app)
      .get('/me');

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'AUTHENTICATION_TOKEN_MISSING',
    });
  });

  it('should return a 401 status code if token is invalid', async () => {
    const response = await request(app)
      .get('/me')
      .set('Authorization', 'Bearer 12121212121')
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(401);
    expect(response.body).toStrictEqual({
      error: 'INVALID_AUTHENTICATION_TOKEN',
    });
  });

  it('should return a 500 status code if has internal server error', async () => {
    UserModel.findOne = jest.fn().mockImplementation(() => {
      throw new Error('Simulated internal server error');
    });

    const response = await request(app)
      .get('/me')
      .set('Authorization', validAuthenticationToken())
      .set('Content-Type', 'application/json');

    expect(response.status).toBe(500);
    expect(response.body).toStrictEqual({
      error: 'Internal Server Error',
    });
  });
});
