import { Router } from "express";
import {
  loginUser,
  registerUser,
  setAvatar,
} from "../Controllers/userControllers.js";
import { validateUser } from "../Middlewares/userValidations.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/avatar", validateUser, setAvatar);
router.get("/", validateUser, setAvatar);

export default router;
