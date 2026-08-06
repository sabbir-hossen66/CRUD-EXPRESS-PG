
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import jwt from 'jsonwebtoken';

//higher order function
const auth = (...roles: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
try{
        const token = req.headers.authorization;
        if(!token){
            return res.status(401).json({
                success: false,
                message: "Unauthorized: No token provided",
            });             
        }
        const decoded= jwt.verify(token, config.jwtSecret) as jwt.JwtPayload;
        console.log(decoded);
        req.user =decoded ; 
       
        if(roles.length && !roles.includes(decoded.role)) {
            return res.status(403).json({
                success: false,
                message: "Forbidden: You do not have the required role",
            });
        }

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