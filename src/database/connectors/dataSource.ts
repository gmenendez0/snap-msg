import {DataSource, DataSourceOptions} from "typeorm";
import {DB_DATABASE, DB_HOST, DB_LOGGING, DB_PASSWORD, DB_PORT, DB_SYNCHRONIZE, DB_TYPE, DB_USERNAME, MIGRATIONS_PATH} from "../../config";
import {Message} from "../../services/domain/Message";

export const AppDataSource = new DataSource(getDatabaseConfig());

// Pre: Podemos hacer las conversiones necesarias para que los valores de las variables de entorno sean del tipo correcto debido a que se
// validan en el archivo config.ts que las envVars importadas efectivamente existan y tengan un valor asignado.
// Nunca deberíamos tener un valor nulo en una variable de entorno que se haya validado previamente.
function getDatabaseConfig(): DataSourceOptions {
    const dbType = DB_TYPE as "postgres"; //TODO: Esta linea hace ruido.
    const dbPort = parseInt(DB_PORT as string);
    const dbSynchronize = DB_SYNCHRONIZE === "true";
    const dbLogging = DB_LOGGING === "true";
    const migrationPath = MIGRATIONS_PATH as string;

    return {
        type: dbType,
        host: DB_HOST,
        port: dbPort,
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DATABASE,
        synchronize: dbSynchronize,
        logging: dbLogging,
        entities: [Message],
        migrations: [migrationPath],
    };
}