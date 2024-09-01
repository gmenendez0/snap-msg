import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";
import {InvalidMessageTextLenght} from "./errors/InvalidMessageTextLenght";

const MESSAGE_TEXT_MIN_LENGTH = 1;
const MESSAGE_TEXT_MAX_LENGTH = 200;

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid")
    private id: number;

    @Column()
    private text: string;

    constructor(text: string) {
        this.setText(text)
    }

    public getId(): number {
        return this.id;
    }

    public setText(text: string): void {
        this.validateText(text);
        this.text = text;
    }

    private validateText(text: string): void {
        if (text.length < MESSAGE_TEXT_MIN_LENGTH) throw new InvalidMessageTextLenght("Message text cannot be empty");
        if (text.length > MESSAGE_TEXT_MAX_LENGTH) throw new InvalidMessageTextLenght("Message text cannot be longer than " + MESSAGE_TEXT_MAX_LENGTH + " characters");
    }

    public getText(): string {
        return this.text;
    }
}
