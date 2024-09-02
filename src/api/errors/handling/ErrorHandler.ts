import {NextFunction, Response, Request} from "express";
import {StatusCodes} from "http-status-codes";
import { HttpResponseSender } from "../../controllers/HttpResponseSender";
import {ErrorFormatter} from "./ErrorFormatter";
import {RFC7807ErrorFormatter} from "./RFC7807ErrorFormatter";
import {Helpers} from "../../../utils/helpers";

/**
 * Handles errors in the Express application and sends a formatted response.
 *
 * This class is responsible for determining the appropriate HTTP status code and
 * formatting the error message. It uses an instance of `HttpResponseSender`
 * to send the formatted error response to the client.
 */
class ErrorHandler{
    private readonly _error: Error;
    private _req: Request;
    private readonly _res: Response;
    private _next: NextFunction;
    private _httpResponseSender: HttpResponseSender;
    private _errorFormatter: ErrorFormatter;

    constructor(error: Error, req: Request, res: Response, next: NextFunction){
        this._error = error;
        this._req = req;
        this._res = res;
        this._next = next;
        this._errorFormatter = new RFC7807ErrorFormatter();
    }

    /**
     * Handles the error by sending a formatted response.
     *
     * This method determines the appropriate status code and formats the error message
     * before sending the response to the client.
     */
    public handle = (): void => {
        const errorStatusCode = this.getErrorStatusCode();
        const errorData = this.getErrorData();

        this._httpResponseSender.response(this._res, errorData, errorStatusCode);
    }

    /**
     * Retrieves the HTTP status code for the error.
     *
     * @returns The status code corresponding to the error.
     */
    private getErrorStatusCode = (): StatusCodes => {
        return Helpers.mapErrorToStatusCode(this._error);
    }

    /**
     * Formats the error data using the error formatter.
     *
     * @returns The formatted error data as a string.
     */
    private getErrorData = (): string => {
        return this._errorFormatter.formatError(this._error);
    }
}

/**
 * Express middleware function for handling errors.
 *
 * Creates an instance of `ErrorHandler` and invokes its `handle` method to format and send
 * the error response.
 *
 * @param error - The error to handle.
 * @param req - The Express request object.
 * @param res - The Express response object.
 * @param next - The next middleware function in the Express stack.
 */
export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    new ErrorHandler(error, req, res, next).handle();
}