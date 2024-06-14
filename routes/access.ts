import express from "express";
import { PrismaClient } from "@prisma/client";
import { authMiddleware } from "../middlewares/auth";
import { generateQrCode } from "../utils/qrCodeGenerator";

const prisma = new PrismaClient();
const router = express.Router();

// Middleware to verify admin role
const adminMiddleware = async (req: any, res: any, next: any) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  if (user?.role !== "admin") {
    return res.status(403).json({ message: "Access denied" });
  }
  next();
};

// Get all users
router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

// Get user access logs
router.get(
  "/logs/:userId",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { userId } = req.params;
    const logs = await prisma.accessLog.findMany({ where: { userId } });
    res.json(logs);
  }
);

// Generate QR code for user
router.post(
  "/generate-qr",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    const { userId } = req.body;
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const qrCode = generateQrCode(user.id);
    await prisma.qrCode.create({ data: { userId: user.id, code: qrCode } });
    res.json({ qrCode });
  }
);

// Record access
router.post("/record-access", authMiddleware, async (req, res) => {
  const { userId, action } = req.body;
  await prisma.accessLog.create({ data: { userId, action } });
  res.json({ message: "Access recorded" });
});

export default router;
