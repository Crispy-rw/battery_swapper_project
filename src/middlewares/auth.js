import jwt from 'jsonwebtoken';
import { onError } from '../utils/response';

class Authentication {
  async checkToken(req, res, next) {
    const token = req.header('x-auth-token') || req.header('Authorization');
    if (!token) {
      return next();
    }
    try {
      const decoded = jwt.verify(token, process.env.JWT_TOKEN);
      req.user = decoded;
      return next();
    } catch (err) {
      return onError(res, 401, 'Invalid token provided, check your token please')
    }
  }

}

export default new Authentication();
