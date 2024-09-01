import {DatabaseConnectorStrategy} from "./DatabaseConnectorStrategy";
import {TypeORMDatabaseConnectorStrategy} from "./TypeORMDatabaseConnectorStrategy";

class DatabaseConnector<T, Y> {
    private _strategy: DatabaseConnectorStrategy<T, Y>

    constructor(strategy: DatabaseConnectorStrategy<T, Y>) {
        this._strategy = strategy;
    }

    public initializeConnection = async (): Promise<T> => {
        return this._strategy.initializeConnection();
    }

    public getDataSource = (): Y => {
        return this._strategy.getDataSource();
    }
}

export default new DatabaseConnector(new TypeORMDatabaseConnectorStrategy());