import {Router} from "express";
import {MessageController} from "../controllers/MessageController";
import {MessageService} from "../../services/application/MessageService";
import {TypeORMMessageRepository} from "../../database/repositories/TypeORM/MessageRepository/TypeORMMessageRepository";

const messageRouter = Router();
const messageController = new MessageController(new MessageService(new TypeORMMessageRepository()));

messageRouter.get("", messageController.getAllMessages);
messageRouter.get("/:id", messageController.getMessage);
messageRouter.post("", messageController.createMessage);
messageRouter.delete("/:id", messageController.deleteMessage);

export default messageRouter;