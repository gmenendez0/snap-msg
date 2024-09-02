import {Message} from "../../../../services/domain/Message";
import {MessageRepository} from "../../interfaces/MessageRepository";
import {TypeORMRepository} from "../TypeORMRepository";
import {DatabaseError} from "../../../errors/DatabaseError";

/**
 * TypeORM implementation of the `MessageRepository` interface.
 *
 * This class extends the `TypeORMRepository` class and provides concrete implementations
 * for the methods defined in the `MessageRepository` interface. It interacts with the
 * `Message` entity using TypeORM.
 */
export class TypeORMMessageRepository extends TypeORMRepository<Message> implements MessageRepository {
    constructor() {
        super(Message);
    }

    /**
     * Retrieves a message by its ID.
     *
     * @param id - The ID of the message to retrieve.
     * @returns A promise that resolves to the `Message` entity if found, or `null` if not.
     * @throws `DatabaseError` if an error occurs during the retrieval.
     */
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

    /**
     * Retrieves all messages.
     *
     * @returns A promise that resolves to an array of `Message` entities.
     * @throws `DatabaseError` if an error occurs during the retrieval.
     */
    public getAll = (): Promise<Message[]> => {
        try {
            return this.typeOrmRepository.find();
        } catch (error: any) {
            throw new DatabaseError(error);
        }
    };

    /**
     * Saves a message entity.
     *
     * @param message - The `Message` entity to save.
     * @returns A promise that resolves to the saved `Message` entity.
     * @throws `DatabaseError` if an error occurs during the save operation.
     */
    public save = (message: Message): Promise<Message> => {
        try {
            return this.typeOrmRepository.save(message);
        } catch (error: any) {
            throw new DatabaseError(error);
        }
    };

    /**
     * Deletes a message by its ID.
     *
     * @param id - The ID of the message to delete.
     * @returns A promise that resolves to `true` if the message was successfully deleted, or `false` if not.
     * @throws `DatabaseError` if an error occurs during the deletion.
     */
    public delete = async (id: string): Promise<boolean> => {
        try {
            const deleteResult = await this.typeOrmRepository.delete(id);
            return deleteResult.affected !== 0;
        } catch (error: any) {
            throw new DatabaseError(error);
        }
    };
}