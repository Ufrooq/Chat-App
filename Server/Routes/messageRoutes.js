import { Router } from "express";
import { getMessages, sendMessage } from "../Controllers/messageControllers.js";

const router = Router();

router.post("/addmsg", sendMessage);
router.get("/getmsgs", getMessages);

export default router;
