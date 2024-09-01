import {NextFunction} from "express";
import {StatusCodes} from "http-status-codes";
import {DatabaseError} from "../../database/errors/DatabaseError";
import {InvalidMessageTextLength} from "../../services/domain/errors/InvalidMessageTextLength";
import { HttpResponseSender } from "../controllers/HttpResponseSender";

const STANDARD_INTERNAL_SERVER_ERROR_MESSAGE = "An internal server error occurred.";

class ErrorHandler{
    private _error: Error;
    private _req: Request;
    private _res: Response;
    private _next: NextFunction;
    private _httpResponseSender: HttpResponseSender;

    // ? Definimos un mapa estatico compartido ya que sera identico para todas las instancias de la clase y asi ahorramos memoria.
    private static _errorStatusCodeMap: Map<Function, StatusCodes> = new Map<Function, StatusCodes>();

    constructor(error: Error, req: Request, res: Response, next: NextFunction){
        this._error = error;
        this._req = req;
        this._res = res;
        this._next = next;

        if (ErrorHandler._errorStatusCodeMap.size === 0) ErrorHandler.initializeErrorStatusCodeMap();
    }

    private static initializeErrorStatusCodeMap = () => {
        this._errorStatusCodeMap.set(DatabaseError, StatusCodes.INTERNAL_SERVER_ERROR);
        this._errorStatusCodeMap.set(InvalidMessageTextLength, StatusCodes.BAD_REQUEST);
    }

    private getErrorStatusCode = (): StatusCodes => {
        let errorStatusCode = ErrorHandler._errorStatusCodeMap.get(this._error.constructor);
        if (errorStatusCode === undefined) errorStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;

        return errorStatusCode;
    }

    private getErrorDescription = (statusCode: StatusCodes): string => {
        return statusCode === StatusCodes.INTERNAL_SERVER_ERROR ? STANDARD_INTERNAL_SERVER_ERROR_MESSAGE : this._error.message;
    }

    private getResponseBody = (statusCode: StatusCodes, errorDescription: string, type: string): any => {

    }

    public handle = () => {
        const errorStatusCode = this.getErrorStatusCode();
        const errorDescription = this.getErrorDescription(errorStatusCode);
        const type = this._error.constructor.name;


    }
}

export const errorMiddleware = (error: Error, req: Request, res: Response, next: NextFunction) => {
    new ErrorHandler(error, req, res, next).handle();
}