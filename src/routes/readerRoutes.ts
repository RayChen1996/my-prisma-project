import { Router } from "express";
// import { createReader } from "../controllers/readerController";

const router = Router();
/**
 * @swagger
 * /readers:
 *   post:
 *     summary: Create a new reader
 *     tags: [Readers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Reader'
 *     responses:
 *       200:
 *         description: The reader was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Reader'
 */
// router.post("/readers", createReader);

// 註冊其他路由

export default router;
