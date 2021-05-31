import { NextFunction } from 'express';
import { IRequest, IResponse } from './context';

function authorize(roles : string[] = []) {
  return (req: IRequest, res: IResponse, next: NextFunction) => {
    if (roles.length && !roles.includes(req.user.user.role)) {
      return res.status(404).json({ message: 'Unauthorized' });
    }

    return next();
  };
}

export default authorize;
