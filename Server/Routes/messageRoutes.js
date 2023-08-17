import { Router } from "express";
import { getMessages, sendMessage } from "../Controllers/messageControllers.js";

const router = Router();

router.post("/addmsg", sendMessage);
router.post("/getmsgs", getMessages);

export default router;
