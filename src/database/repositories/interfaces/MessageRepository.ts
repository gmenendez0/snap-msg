import {Message} from "../../../services/domain/Message";

export interface MessageRepository {
    getById(id: string): Promise<Message  | null>;
    getAll(): Promise<Message[]>;
    save(message: Message): Promise<Message>;
    delete(id: string): Promise<boolean>;
}