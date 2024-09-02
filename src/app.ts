import {Application} from "express";
import express from "express";
import cors from "cors";
import {PORT} from "./config";
import databaseConnector from "./database/connectors/DatabaseConnector";
import {errorMiddleware} from "./api/errors/handling/ErrorHandler";
import router from "./api/routes/routes";
import logger from "./utils/log/Logger";

databaseConnector.initializeConnection().then(() => {
    const app: Application = express();
    app.use(cors());
    app.use(router)
    app.use(errorMiddleware)

    app.listen(PORT, () => {
        logger.logInfo(`Server is running on port ${PORT}`);
        console.log(`Server is running on port ${PORT}`);
    });
});

// 5. Tests end-to-end
// 6. Armar readMe
// 7. Dockerizar