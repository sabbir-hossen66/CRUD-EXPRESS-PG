import { Request, Response } from "express";
import { authServices } from "./auth.service";

const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const result = await authServices.loginUser(email, password);

        return res.status(200).json({
            success: true,
            data: result,
            message: "User logged in successfully",
        });
    } catch (err: any) {
        return res.status(500).json({
            success: false,
            message: err.message || "Internal Server Error",
        });
    }
}

export const authController = {
    loginUser
}