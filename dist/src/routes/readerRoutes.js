"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const readerController_1 = require("../controllers/readerController");
const router = (0, express_1.Router)();
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
router.post("/readers", readerController_1.createReader);
// 註冊其他路由
exports.default = router;
