import express from "express"
import { chat, query } from "../controllers/chatController";

const router=express.Router();

router.post("/chat",chat)
router.post("/query",query)

<<<<<<< HEAD
export default router ;
=======
export default router ;
>>>>>>> d5fb57e1e03d4688e7b9aeae313f85eec7f81427
