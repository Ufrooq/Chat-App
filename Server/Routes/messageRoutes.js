import { Router } from "express";
import { getMessages, sendMessage } from "../Controllers/messageControllers.js";

const router = Router();

router.post("/addmsg", sendMessage);
router.post("/getmsg", getMessages);

export default router;
