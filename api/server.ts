import express from "express";
import apiRouter from "./route/index";

const app = express();

// 添加 JSON 解析中间件
app.use(express.json());

// 添加路由
app.use("/api", apiRouter);

export default app;
