import jwt from 'jsonwebtoken';
import 'dotenv/config';

export const accessToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '15m' });
};

export const refreshToken = (user) => {
  return jwt.sign({ user }, process.env.SECRET_REFRESH_TOKEN, { expiresIn: '1d' });
};
