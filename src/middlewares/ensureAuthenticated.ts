import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import authConfig from '../config/auth';

export default function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new Error('Token not provider!');
  }

  const token = authHeader.replace('Bearer ', '');

  try {
    const decoded = verify(token, authConfig.jwt.secret as string);
    console.log(decoded);
    return next();
  } catch (error) {
    throw new Error('Token invalid!');
  }
}
