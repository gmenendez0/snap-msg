import {Application} from "express";
import express from "express";
import cors from "cors";
import {PORT} from "./config";
import { DataSource } from "typeorm";
import { getDatabaseConfig } from "./database/databaseConfig";

const app: Application = express();
app.use(cors());

const AppDataSource = new DataSource(getDatabaseConfig());
AppDataSource.initialize()
    .then(() => {
        console.log("Database connected"); //TODO Logear
    })
    .catch((error) => console.log(error)) //TODO Logear


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});