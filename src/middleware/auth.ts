
import { Request, Response, NextFunction } from 'express';

//higher order function
const auth = () => {
    return (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;
        console.log({token});
      next();
    }
}

export default auth;