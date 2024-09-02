import {DatabaseConnectorStrategy} from "./DatabaseConnectorStrategy";
import {DataSource} from "typeorm";
import {AppDataSource} from "./dataSource";

export class TypeORMDatabaseConnectorStrategy implements DatabaseConnectorStrategy<DataSource, DataSource> {
    private static _instance: DataSource;

    constructor() {
        TypeORMDatabaseConnectorStrategy._instance = AppDataSource;
    }


    public initializeConnection = async (): Promise<DataSource> => {
        return this.instance.initialize();
    };

    private get instance(): DataSource {
        return TypeORMDatabaseConnectorStrategy._instance;
    }

    public getDataSource(): DataSource {
        return this.instance;
    }
}