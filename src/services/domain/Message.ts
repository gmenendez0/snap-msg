import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { InvalidMessageTextLength } from "./errors/InvalidMessageTextLength";

const MESSAGE_TEXT_MIN_LENGTH = 1;
const MESSAGE_TEXT_MAX_LENGTH = 280;

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid")
    private _id: string;

    @Column()
    private _text: string;

    constructor(text: string) {
        this.text = text;
    }

    public get id(): string {
        return this._id;
    }

    public get text(): string {
        return this._text;
    }

    public set text(text: string) {
        //this.validateText(text);
        this._text = text;
    }
    private validateText = (text: string): void => {
        if (text.length < MESSAGE_TEXT_MIN_LENGTH) throw new InvalidMessageTextLength("Message text cannot be empty");
        if (text.length > MESSAGE_TEXT_MAX_LENGTH) throw new InvalidMessageTextLength("Message text cannot be longer than " + MESSAGE_TEXT_MAX_LENGTH + " characters");
    };
}

