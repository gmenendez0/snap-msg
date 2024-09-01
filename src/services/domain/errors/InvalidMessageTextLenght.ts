export class InvalidMessageTextLenght extends Error {
        constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidMessageTextLenght.prototype)
    }
}