import { pool } from '../../config/db';
import { Request, Response } from 'express';
import { userServices } from './user.service';


const createUser = async (req:Request, res:Response) => {
  try {
    const result = await userServices.createUser(req.body);

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

const getUser=async (req: Request, res: Response) => {
  try {
    const result =  await userServices.getUser();
    return res.status(200).json({
      success: true,
      data: result.rows,
      message: "Users retrieved successfully",
    });
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}

const getSingleUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const result = await userServices.getSingleUser(req.params.id as string);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    else{ res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "User retrieved successfully",
    }) }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}

const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
const { name, email, age, phone } = req.body;
  try {
    const result = await userServices.updateUser(id as string, name, email, age, phone);

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    else{ res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "User updated successfully",
    }) }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await userServices.deleteUser(id as string);
   console.log('result:', result);
    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    else{ res.status(200).json({
      success: true,
      data: result.rows[0],
      message: "User deleted successfully",
    }) }
  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message || "Internal Server Error",
    });
  }
}

export const userController = {
  createUser,
  getUser,
  getSingleUser,
  updateUser,
  deleteUser
}