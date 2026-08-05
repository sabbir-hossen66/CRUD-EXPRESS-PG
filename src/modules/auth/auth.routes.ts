import { Router } from "express";
import { authServices } from "./auth.service";

const router = Router();
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await authServices.loginUser(email, password);
    res.status(200).json({ message: "Login successful", user });
  } catch (error: any) {
    res.status(401).json({ message: error.message });
  }
});

export const authRoutes = router;