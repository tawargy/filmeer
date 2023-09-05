import { db } from '../datastore';
import { AuthExpressHandler } from '../types';
import { verifyJwt } from '../utils/jwtAuth';
//eslint-disable-next-line
export const authMiddleware: AuthExpressHandler<any, any, any> = async (
  req,
  res,
  next
) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).send({ error: 'You are not logedin' });
    }
    const payload = verifyJwt(token);
    const user = await db.getUserById(payload.userId);

    if (!user) {
      return res.status(401).send({ error: 'User not exist' });
    }
    req.body.user = user;
    next();
  } catch (err) {
    res.status(401).send({ error: 'Bad Token' });
  }
};
//eslint-disable-next-line
export const adminAuthMiddleware: AuthExpressHandler<any, any, any> = async (
  req,
  res,
  next
) => {
  try {
    const { user } = req.body;
    if (user.rouls !== 'admin') {
      return res.status(403).send({ error: 'you are not an admin' });
    }

    next();
  } catch (err) {
    res.status(401).send({ error: 'error' });
  }
};
