import {Application} from "express";
import express from "express";
import cors from "cors";
import {PORT} from "./config";
import connector from "./database/connectors/DatabaseConnector";
import {errorMiddleware} from "./api/errors/handling/ErrorHandler";

connector.initializeConnection()
    .then(() => {
        const app: Application = express();
        app.use(cors());
        app.use(errorMiddleware)

        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }).catch((error) => {
        console.log(error);
        process.exit(1);
    });

// 1. Controllers y routes
// 2. Logs
// 3. Migraciones
// 4. Documentación
// 5. Tests end-to-end
// 6. Armar readMe
// 7. Dockerizar