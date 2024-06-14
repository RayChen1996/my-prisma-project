import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes";
import readerRoutes from "./routes/readerRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import setupSwagger from "./utils/swagger";

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use("/api", userRoutes);
app.use("/api", readerRoutes);
app.use(errorHandler);

setupSwagger(app);

export default app;
