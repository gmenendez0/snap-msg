import {Application} from "express";
import express from "express";
import cors from "cors";
import {PORT} from "./config";
import {TypeORMDatabaseConnector} from "./database/TypeORMDatabaseConnector";
import {DatabaseConnector} from "./database/DatabaseConnector";

const database: DatabaseConnector<void> = new TypeORMDatabaseConnector();
database.initializeConnection()
    .then(() => {
        const app: Application = express();
        app.use(cors());

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
        process.exit(1);
    });