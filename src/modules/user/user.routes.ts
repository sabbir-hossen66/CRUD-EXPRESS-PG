import express from 'express';
import { pool } from '../../config/db';
import { userController } from './user.controller';
const router =express.Router();

router.post("/",userController.createUser);

router.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
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
})

export const userRoutes = router