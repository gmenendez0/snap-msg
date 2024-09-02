import {Message} from "../domain/Message";
import {MessageRepository} from "../../database/repositories/interfaces/MessageRepository";

/**
 * Service class for managing messages.
 * Provides methods to create, retrieve, delete, and list messages.
 */
export class MessageService {
    private messageRepository: MessageRepository;

    /**
     * Creates an instance of MessageService.
     *
     * @param messageRepository - The repository used for message persistence operations.
     */
    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    /**
     * Creates a new message with the specified text and saves it to the repository.
     *
     * @param text - The text content of the message.
     * @returns A promise that resolves to the created message.
     */
    public createMessage = async (text: string): Promise<Message> => {
        const message = new Message();
        message.text = text;
        return this.messageRepository.save(message);
    }

    /**
     * Retrieves a message by its unique identifier.
     *
     * @param id - The unique identifier of the message.
     * @returns A promise that resolves to the message if found, or null if not found.
     */
    public getMessage = async (id: string): Promise<Message | null> => {
        return this.messageRepository.getById(id);
    }

    /**
     * Retrieves all messages from the repository.
     *
     * @returns A promise that resolves to an array of all messages.
     */
    public getAllMessages = async (): Promise<Message[]> => {
        return this.messageRepository.getAll();
    }

    /**
     * Deletes a message by its unique identifier.
     *
     * @param id - The unique identifier of the message to be deleted.
     * @returns A promise that resolves to true if the message was successfully deleted, or false otherwise.
     */
    public deleteMessage = async (id: string): Promise<boolean> => {
        return this.messageRepository.delete(id);
    }
}