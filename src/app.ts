import {Application} from "express";
import express from "express";
import cors from "cors";
import {PORT} from "./config";
import databaseConnector from "./database/connectors/DatabaseConnector";
import {errorMiddleware} from "./api/errors/handling/ErrorHandler";
import router from "./api/routes/routes";
import logger from "./utils/log/Logger";

const app: Application = express();
app.use(express.json());
app.use(cors());
app.use(router);
app.use(errorMiddleware);

databaseConnector.initializeConnection().then(() => {
    app.listen(PORT, () => {
        logger.logInfo(`Server is running on port ${PORT}`);
        console.log(`Server is running on port ${PORT}`);
    });
});

export default app;

// 6. Armar readMe
// 7. Dockerizar