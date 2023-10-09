import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { response } from './response-handler.js';

export const authenticateToken = (req, res, next) => {
  try {
    const authToken = req.header('Authorization')?.split(' ')[1] || '';

    jwt.verify(authToken, process.env.SECRET_ACCESS_TOKEN, (error, data) => {
      if (error) {
        return response(401, {}, 'Token expired or not match', res);
      }

      const { name, email } = data.user;
      req.user = { name, email };
      next();
    });
  } catch (error) {
    console.log(error);
  }
};
