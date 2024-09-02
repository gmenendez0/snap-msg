export interface LoggingStrategy{
    logInfo(message: string): void;
    logError(message: string): void;
}