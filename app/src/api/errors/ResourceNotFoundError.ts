/**
 * Represents an error that occurs when a requested resource is not found.
 *
 * This class extends the built-in `Error` class and sets the prototype to `ResourceNotFoundError`
 * to ensure proper inheritance in custom error handling scenarios.
 */
export class ResourceNotFoundError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, ResourceNotFoundError.prototype)
    }
}