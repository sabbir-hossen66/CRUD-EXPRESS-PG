
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';

//higher order function
const auth = () => {
    return async (req: Request, res: Response, next: NextFunction) => {
try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });             
        }
        const decoded= jwt.verify(token, config.jwtSecret);
        req.user =decoded as jwt.JwtPayload; 
        next();
}

catch(err){
    return res.status(401).json({
        success: false,
        message: "Unauthorized: Invalid token",
    });
}
}   
}
export default auth;