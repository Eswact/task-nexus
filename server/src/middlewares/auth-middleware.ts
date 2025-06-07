import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import db from '../models';
const User = db.users;

interface CustomRequest extends Request {
  user?: typeof User;
}

const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
  let token: string | undefined;

  if (req.session && req.session.user) {
    token = req.session.user;
  } 
  else if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as { id: string };

    const userId = new mongoose.Types.ObjectId(decoded.id);
    const user = await User.findById(userId);

    if (!user) {
      console.error('User not found for ID:', decoded.id);
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // add user to request
    (req as any).user = user;
    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;