import {StatusCodes} from "http-status-codes";
import {DatabaseError} from "../database/errors/DatabaseError";
import {InvalidMessageTextLength} from "../services/domain/errors/InvalidMessageTextLength";

export class Helpers {
    private static _errorStatusCodeMap: Map<Function, StatusCodes> = new Map<Function, StatusCodes>();
    private static requiredEnvVars = [ 'PORT', 'DB_HOST', 'DB_PORT', 'DB_USERNAME', 'DB_PASSWORD', 'DB_DATABASE', 'DB_SYNCHRONIZE', 'DB_LOGGING', 'ENTITIES_PATH', 'DB_TYPE' ];

    public static validateEnvVars(): void {
        Helpers.validateEnvVarsList(Helpers.requiredEnvVars);
    }

    public static validateEnvVarsList(envVarsList: string[]): void {
        envVarsList.forEach((envVar) => {
            Helpers.validateEnvVar(envVar);
        });
    }

    public static validateEnvVar(envVar: string): void {
        if (!process.env[envVar]) throw new Error(`Environment variable ${envVar} is missing`); // ? TODO Logear
    }

    public static mapErrorToStatusCode(error: Error): StatusCodes {
        if (Helpers._errorStatusCodeMap.size === 0) Helpers.initializeErrorStatusCodeMap();
        return Helpers.getErrorStatusCode(error);
    }

    private static getErrorStatusCode = (error: Error): StatusCodes => {
        let errorStatusCode = Helpers._errorStatusCodeMap.get(error.constructor);
        if (errorStatusCode === undefined) errorStatusCode = StatusCodes.INTERNAL_SERVER_ERROR;

        return errorStatusCode;
    }

    private static initializeErrorStatusCodeMap = (): void => {
        this._errorStatusCodeMap.set(DatabaseError, StatusCodes.INTERNAL_SERVER_ERROR);
        this._errorStatusCodeMap.set(InvalidMessageTextLength, StatusCodes.BAD_REQUEST);
    }
}