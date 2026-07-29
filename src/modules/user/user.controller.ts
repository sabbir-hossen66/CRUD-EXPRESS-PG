import { pool } from '../../config/db';
import { Request, Response } from 'express';
import { userServices } from './user.service';


const createUser = async (req:Request, res:Response) => {
  const { name, email, age, phone } = req.body;

  try {
    const result = await userServices.createUser(name, email, age, phone);

    return res.status(201).json({
      success: true,
      data: result.rows[0],
      message: "User created successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}
export const userController = {
  createUser
}