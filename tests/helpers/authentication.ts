import { sign } from 'jsonwebtoken';

const generateToken = (payload: Record<string, any>): string => {
  const token = sign(payload, String(process.env.AUTH_SECRET_KEY), { expiresIn: '1hr' });
  return `Bearer ${token}`;
};

export const validAuthenticationToken = (): string => {
  const payload = {
    id: '6457f31e39a28456089eaa0d',
    email: 'example.doe@gmail.com',
    authenticatedAt: new Date().toISOString(),
  };

  return generateToken(payload);
};

export const validAuthenticationTokenWithoutUser = (): string => {
  const payload = {
    id: '2337f31e39a28456089eaadd',
    email: 'example.doe@gmail.com',
    authenticatedAt: new Date().toISOString(),
  };

  return generateToken(payload);
};
