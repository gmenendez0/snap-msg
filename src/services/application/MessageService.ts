import {Message} from "../domain/Message";
import {MessageRepository} from "../../database/repositories/interfaces/MessageRepository";

export class MessageService {
    private messageRepository: MessageRepository;

    constructor(messageRepository: MessageRepository) {
        this.messageRepository = messageRepository;
    }

    public createMessage = (text: string): void => {
        const message = new Message(text);
        //this.messageRepository.save
    }

    public getMessage = (id: number): Message => {
        //return this.messageRepository.findById(id);
        return new Message("Hello");
    }

    public getAllMessages = (): Message[] => {
        //return this.messageRepository.findAll();
        return [new Message("Hello")];
    }

    public deleteMessage = (id: number): void => {
        //this.messageRepository.delete(id);
    }
}