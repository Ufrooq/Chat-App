import { Router } from "express";
import { loginUser, registerUser } from "../Controllers/userControllers.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/avatar", loginUser);

export default router;
