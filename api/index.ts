import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "../src/routes/userRoutes";
import readerRoutes from "../src/routes/readerRoutes";
import { errorHandler } from "../src/middlewares/errorHandler";
import setupSwagger from "../src/utils/swagger";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", readerRoutes);
app.use(errorHandler);

setupSwagger(app);

export default app;
