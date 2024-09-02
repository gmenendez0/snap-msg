import {LoggingStrategy} from "./LoggingStrategy";
import winston, {Logger} from "winston";
import {LOG_ROUTE} from "../../config";

export class WinstonLoggerStrategy implements LoggingStrategy {
    private _logger: Logger;

    constructor() {
        this._logger = winston.createLogger(
            { level: 'info', format: winston.format.combine(winston.format.timestamp(), winston.format.json()),
            transports: [ new winston.transports.File({ filename: LOG_ROUTE })],
        });
    }

    public logInfo = (message: string): void => {
        this._logger.info(message);
    }

    public logError = (message: string): void => {
        this._logger.error(message);
    }
}