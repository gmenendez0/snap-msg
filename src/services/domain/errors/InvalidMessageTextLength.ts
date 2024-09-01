export class InvalidMessageTextLength extends Error {
        constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidMessageTextLength.prototype)
    }
}