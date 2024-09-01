import {Message} from "../../../../services/domain/Message";
import {MessageRepository} from "../../interfaces/MessageRepository";
import {DeleteResult} from "typeorm";
import {TypeORMRepository} from "../TypeORMRepository";
import {DatabaseError} from "../../../errors/DatabaseError";

export class TypeORMMessageRepository extends TypeORMRepository<Message> implements MessageRepository {
    constructor() {
        super(Message);
    }

    public getById = async (id: string): Promise<Message | null> => {
        try {
            return this.typeOrmRepository.findOne({
                where: {
                    id: id
                }
            })
        } catch (error: any) {
            throw new DatabaseError(error);
        }
    }

    public getAll = (): Promise<Message[]> => {
        try {
            return this.typeOrmRepository.find();
        } catch (error: any) {
            throw new DatabaseError(error);
        }
    };

    public save = (message: Message): Promise<Message> => {
        try {
            return this.typeOrmRepository.save(message);
        } catch (error: any) {
            throw new DatabaseError(error);
        }
    };

    public delete = async (id: string): Promise<boolean> => {
        try {
            const deleteResult = await this.typeOrmRepository.delete(id);
            return deleteResult.affected !== 0;
        } catch (error: any) {
            throw new DatabaseError(error);
        }
    };
}