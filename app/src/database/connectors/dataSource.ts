import {DataSource, DataSourceOptions} from "typeorm";
import {DB_DATABASE, DB_HOST, DB_LOGGING, DB_PASSWORD, DB_PORT, DB_SYNCHRONIZE, DB_TYPE, DB_USERNAME, MIGRATIONS_PATH} from "../../config";
import {Message} from "../../services/domain/Message";

/**
 * The data source for TypeORM, configured with the database connection settings.
 */
export const AppDataSource = new DataSource(getDatabaseConfig());

/**
 * Retrieves the database configuration for TypeORM.
 *
 * Converts environment variables into a configuration object for the database connection.
 * EnvVars should be checked before using this function.
 *
 * @returns {DataSourceOptions} The configuration object for TypeORM.
 */
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