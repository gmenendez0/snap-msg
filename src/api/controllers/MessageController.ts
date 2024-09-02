import {MessageService} from "../../services/application/MessageService";
import {Controller} from "./Controller";
import {HttpResponseSender} from "./HttpResponseSender";
import {Request, Response} from "express";
import {ResourceNotFoundError} from "../errors/ResourceNotFoundError";

/**
 * Controller class for handling message-related HTTP requests.
 *
 * This class provides methods for creating, retrieving, updating, and deleting messages
 * through interaction with the `MessageService`. It extends the base `Controller` class
 * and utilizes `HttpResponseSender` to format and send responses.
 */
export class MessageController extends Controller{
    private _messageService: MessageService;

    constructor(messageService: MessageService) {
        super(new HttpResponseSender());
        this._messageService = messageService;
    }

    /**
     * Handles the creation of a new message.
     *
     * Retrieves the message text from the request body, creates a new message using the
     * `MessageService`, and sends a response with status code 201 (Created) containing the
     * created message.
     *
     * @param req - The Express `Request` object.
     * @param res - The Express `Response` object.
     */
    public createMessage = async (req: Request, res: Response): Promise<void> => {
        const text = req.body.message;
        const message = await this._messageService.createMessage(text);

        return this.createdResponse(res, message);
    }

    /**
     * Handles the retrieval of a message by its ID.
     *
     * Retrieves the message ID from the request parameters, fetches the message using the
     * `MessageService`, and sends a response with status code 200 (OK) containing the
     * message. If the message is not found, throws a `ResourceNotFoundError`.
     *
     * @param req - The Express `Request` object.
     * @param res - The Express `Response` object.
     */
    public getMessage = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const message = await this._messageService.getMessage(id);

        if (message === null) new ResourceNotFoundError("Message not found");

        return this.okResponse(res, message);
    }

    /**
     * Handles the retrieval of all messages.
     *
     * Fetches all messages using the `MessageService` and sends a response with status code
     * 200 (OK) containing the list of messages.
     *
     * @param req - The Express `Request` object.
     * @param res - The Express `Response` object.
     */
    public getAllMessages = async (req: Request, res: Response): Promise<void> => {
        const messages = await this._messageService.getAllMessages();
        return this.okResponse(res, messages);
    }

    /**
     * Handles the deletion of a message by its ID.
     *
     * Retrieves the message ID from the request parameters, attempts to delete the message
     * using the `MessageService`, and sends a response with status code 200 (OK) and a
     * success message if the deletion was successful. If the message was not found, throws
     * a `ResourceNotFoundError`.
     *
     * @param req - The Express `Request` object.
     * @param res - The Express `Response` object.
     */
    public deleteMessage = async (req: Request, res: Response): Promise<void> => {
        const id = req.params.id;
        const deleted = await this._messageService.deleteMessage(id);

        if (!deleted) new ResourceNotFoundError("Message not found");

        return this.okResponse(res, {message: "Message deleted"});
    }
}