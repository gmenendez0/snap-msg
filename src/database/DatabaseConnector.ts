export interface DatabaseConnector<T> {
    initializeConnection(): Promise<T>;
}