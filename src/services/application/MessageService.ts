import {Message} from "../domain/Message";
import {MessageRepository} from "../../database/repositories/interfaces/MessageRepository";

export class MessageService {
    private messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public createMessage = async (text: string): Promise<Message> => {
        const message = new Message(text);
        return this.messageRepository.save(message);
    }

    public getMessage = async (id: string): Promise<Message | null> => {
        return this.messageRepository.getById(id);
    }

    public getAllMessages = async (): Promise<Message[]> => {
        return this.messageRepository.getAll();
    }

    public deleteMessage = async (id: string): Promise<boolean> => {
        return this.messageRepository.delete(id);
    }
}