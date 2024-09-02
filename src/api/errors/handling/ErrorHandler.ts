import {NextFunction, Response, Request} from "express";
import {StatusCodes} from "http-status-codes";
import { HttpResponseSender } from "../../controllers/HttpResponseSender";
import {ErrorFormatter} from "./ErrorFormatter";
import {RFC7807ErrorFormatter} from "./RFC7807ErrorFormatter";
import {Helpers} from "../../../utils/helpers";

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

    public handle = (): void => {
        const errorStatusCode = this.getErrorStatusCode();
        const errorData = this.getErrorData();

        this._httpResponseSender.response(this._res, errorData, errorStatusCode);
    }

    private getErrorStatusCode = (): StatusCodes => {
        return Helpers.mapErrorToStatusCode(this._error);
    }

    private getErrorData = (): string => {
        return this._errorFormatter.formatError(this._error);
    }
}

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction): void => {
    new ErrorHandler(error, req, res, next).handle();
}