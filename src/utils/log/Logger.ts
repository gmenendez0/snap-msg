import {LoggingStrategy} from "./LoggingStrategy";
import {WinstonLoggerStrategy} from "./WinstonLoggerStrategy";

export class Logger {
    private _loggingStrategy: LoggingStrategy;

    constructor(loggingStrategy: LoggingStrategy) {
        this._loggingStrategy = loggingStrategy;
    }

    public logInfo = (message: string): void => {
        this._loggingStrategy.logInfo(message);
    }

    public logError = (message: string): void => {
        this._loggingStrategy.logError(message);
    }
}

export default new Logger(new WinstonLoggerStrategy());