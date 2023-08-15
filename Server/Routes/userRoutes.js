import { Router } from "express";
import {
  getContacts,
  loginUser,
  registerUser,
  setAvatar,
} from "../Controllers/userControllers.js";
import { validateUser } from "../Middlewares/userValidations.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/avatar", validateUser, setAvatar);
router.get("/", validateUser, getContacts);

export default router;
