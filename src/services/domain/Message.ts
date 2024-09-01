import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

const MESSAGE_TEXT_MIN_LENGTH = 1;
const MESSAGE_TEXT_MAX_LENGTH = 1000;

@Entity()
export class Message {
    @PrimaryGeneratedColumn("uuid")
    private id: number;

    @Column()
    private readonly text: string;

    constructor(text: string) {
        this.validateText(text);
        this.text = text;
    }

    private validateText(text: string): void {
        //TODO Implementar excepciones de dominio custom
        if (text.length < MESSAGE_TEXT_MIN_LENGTH) throw new Error("Message text cannot be empty");
        if (text.length > MESSAGE_TEXT_MAX_LENGTH) throw new Error("Message text cannot be longer than " + MESSAGE_TEXT_MAX_LENGTH + " characters");
    }

    public getId(): number {
        return this.id;
    }

    public getText(): string {
        return this.text;
    }
}
