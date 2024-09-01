import {DatabaseConnector} from "./DatabaseConnector";
import {
    DB_DATABASE,
    DB_HOST,
    DB_LOGGING,
    DB_PASSWORD,
    DB_PORT,
    DB_SYNCHRONIZE,
    DB_TYPE,
    DB_USERNAME,
    ENTITIES_PATH
} from "../config";
import {DataSource, DataSourceOptions, EntityTarget, ObjectLiteral, Repository} from "typeorm";

class TypeORMDatabaseConnector implements DatabaseConnector<void> {
    private readonly instance: DataSource;

    constructor() {
        this.instance = new DataSource(this.getDatabaseConfig());
    }

    // Pre: Podemos hacer las conversiones necesarias para que los valores de las variables de entorno sean del tipo correcto debido a que se
    // validan en el archivo config.ts que las envVars importadas efectivamente existan y tengan un valor asignado.
    // Nunca deberíamos tener un valor nulo en una variable de entorno que se haya validado previamente.
    private getDatabaseConfig = (): DataSourceOptions => {
        const dbType = DB_TYPE as "postgres"; //TODO: Considerar manejar dinámicamente el tipo de base de datos
        const dbPort = parseInt(DB_PORT as string);
        const dbSynchronize = DB_SYNCHRONIZE === "true";
        const dbLogging = DB_LOGGING === "true";
        const entitiesPath = ENTITIES_PATH as string;

        return {
            type: dbType,
            host: DB_HOST,
            port: dbPort,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            synchronize: dbSynchronize,
            logging: dbLogging,
            entities: [entitiesPath]
        };
    };

    public initializeConnection = async (): Promise<void> => {
        return this.instance.initialize()
            .then(() => {
                console.log("Database connected"); // TODO: Logear
            })
            .catch((error) => {
                console.log(error); // TODO: Logear
                throw error;
            });
    };

    public getDataSource = (): DataSource => {
        return this.instance;
    }
}

export default new TypeORMDatabaseConnector();




