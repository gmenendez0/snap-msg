/**
 * Custom error class to represent invalid message text length.
 * Inherits from the built-in Error class.
 */
export class InvalidMessageTextLength extends Error {
        constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, InvalidMessageTextLength.prototype)
    }
}