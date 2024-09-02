import 'reflect-metadata';
import { AppDataSource } from "../src/database/connectors/dataSource";

async function runMigrations() {
    try {
        await AppDataSource.initialize();
        await AppDataSource.runMigrations();

        console.log('Migrations ran successfully.');
    } catch (error) {
        console.error('Error running migrations:', error);
        process.exit(1);
    } finally {
        await AppDataSource.destroy();
    }
}

runMigrations().then(_r => {
    console.log('Ending migration script.');
    process.exit(0);
});
