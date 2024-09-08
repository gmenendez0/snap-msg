import {Message} from "../../../services/domain/Message";

export interface MessageRepository {
    /**
     * Retrieves a `Message` entity by its unique identifier.
     *
     * @param id - The unique identifier of the message.
     * @returns A promise that resolves to the `Message` entity if found, or `null` if not found.
     */
    getById(id: string): Promise<Message  | null>;

    /**
     * Retrieves all `Message` entities from the storage.
     *
     * @returns A promise that resolves to an array of `Message` entities.
     */
    getAll(): Promise<Message[]>;

    /**
     * Saves a new or existing `Message` entity to the storage.
     *
     * @param message - The `Message` entity to be saved.
     * @returns A promise that resolves to the saved `Message` entity.
     */
    save(message: Message): Promise<Message>;

    /**
     * Deletes a `Message` entity by its unique identifier.
     *
     * @param id - The unique identifier of the message to be deleted.
     * @returns A promise that resolves to `true` if the deletion was successful, or `false` if not.
     */
    delete(id: string): Promise<boolean>;
}