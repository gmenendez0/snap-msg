export interface DatabaseConnectorStrategy<T, Y> {
    initializeConnection(): Promise<T>;
    getDataSource(): Y;
}