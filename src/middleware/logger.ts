
import {Request,Response,NextFunction} from 'express';
const loger =(req:Request , res:Response , next:NextFunction)=>{
  console.log(`${req.method} ${req.path}`);
  next();
}

export default loger;