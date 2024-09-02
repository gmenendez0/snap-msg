import {DatabaseConnectorStrategy} from "./DatabaseConnectorStrategy";
import {TypeORMDatabaseConnectorStrategy} from "./TypeORMDatabaseConnectorStrategy";
import logger from "../../utils/log/Logger";

class DatabaseConnector<T, Y> {
    private _strategy: DatabaseConnectorStrategy<T, Y>

    constructor(strategy: DatabaseConnectorStrategy<T, Y>) {
        this._strategy = strategy;
    }

    public initializeConnection = async (): Promise<void> => {
        return await this._strategy.initializeConnection().then(() => {
            console.log("Database connected");
            logger.logInfo("Database connected");
        } ).catch((error) => {
            console.log(`Failed to connect to database: ${error}`);
            logger.logError(`Failed to connect to database: ${error}`);

            throw error;
        });
    }
    public getDataSource = (): Y => {
        return this._strategy.getDataSource();
    }
}

export default new DatabaseConnector(new TypeORMDatabaseConnectorStrategy());