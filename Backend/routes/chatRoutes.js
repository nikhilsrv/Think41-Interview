import express from "express"
import { chat, query } from "../controllers/chatController";

const router=express.Router();

router.post("/chat",chat)
router.post("/query",query)

export default router ;