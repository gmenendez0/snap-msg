import { Router,  } from "express";
import messageRouter from "./messageRoutes";

const router = Router();
router.use("/v1/message", messageRouter);

export default router;