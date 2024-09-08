import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InvalidMessageTextLength } from "./errors/InvalidMessageTextLength";

const MESSAGE_TEXT_MIN_LENGTH = 1;
const MESSAGE_TEXT_MAX_LENGTH = 280;

/**
 * Represents a message entity in the database.
 * Validates the text length to ensure it meets specified constraints.
 */
@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid", { name: "id" })
    private _id: string;

    @Column({ name: "text" })
    private _text: string;

    constructor() {
    }

    /**
     * Gets the unique identifier of the message.
     *
     * @returns The unique identifier of the message.
     */
    public get id(): string {
        return this._id;
    }

    /**
     * Gets the text of the message.
     *
     * @returns The text of the message.
     */
    public get text(): string {
        return this._text;
    }

    /**
     * Sets the text of the message after validating it.
     *
     * @param text - The text to set for the message.
     * @throws InvalidMessageTextLength if the text does not meet the length constraints.
     */
    public set text(text: string) {
        this.validateText(text);
        this._text = text;
    }

    /**
     * Validates the length of the message text.
     *
     * @param text - The text to validate.
     * @throws InvalidMessageTextLength if the text length is outside the allowed range.
     */
    private validateText = (text: string): void => {
        if (text.length < MESSAGE_TEXT_MIN_LENGTH) throw new InvalidMessageTextLength("Message text cannot be empty");
        if (text.length > MESSAGE_TEXT_MAX_LENGTH) throw new InvalidMessageTextLength("Message text cannot be longer than " + MESSAGE_TEXT_MAX_LENGTH + " characters");
    };
}

