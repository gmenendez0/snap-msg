import { Router,  } from "express";
import messageRouter from "./messageRoutes";

const router = Router();
router.use("/v1/messages", messageRouter);

export default router;