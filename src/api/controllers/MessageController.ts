import {MessageService} from "../../services/application/MessageService";
import {Controller} from "./Controller";
import {HttpResponseSender} from "./HttpResponseSender";
import {Request, Response} from "express";
import {ResourceNotFoundError} from "../errors/ResourceNotFoundError";

export class MessageController extends Controller{
    private _messageService: MessageService;

    constructor(messageService: MessageService) {
        super(new HttpResponseSender());
        this._messageService = messageService;
    }

    public createMessage = async (req: Request, res: Response): Promise<void> => {
        const text = req.body.message;
        const message = await this._messageService.createMessage(text);

        return this.createdResponse(res, message);
    }

    public getMessage = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const message = await this._messageService.getMessage(id);

        if (message === null) new ResourceNotFoundError("Message not found");

        return this.okResponse(res, message);
    }

    public getAllMessages = async (req: Request, res: Response): Promise<void> => {
        const messages = await this._messageService.getAllMessages();
        return this.okResponse(res, messages);
    }

    public deleteMessage = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const deleted = await this._messageService.deleteMessage(id);

        if (!deleted) new ResourceNotFoundError("Message not found");

        return this.okResponse(res, {message: "Message deleted"});
    }
}