/**
 * Custom error class for database-related errors.
 *
 * This class extends the built-in `Error` class to represent errors specifically related
 * to database operations.
 */
export class DatabaseError extends Error {
    constructor(message: string) {
        super(message);
        Object.setPrototypeOf(this, DatabaseError.prototype)
    }
}