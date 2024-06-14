import express from "express";
import { PrismaClient } from "@prisma/client";
import logger from "morgan";
const app = express();
const prisma = new PrismaClient();
import cookieParser from "cookie-parser";
import path from "node:path";
app.use(logger("dev"));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = __dirname(__filename);

app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/access", accessRouter); // 新增這行

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
};

const doc = {
  info: {
    title: "Access Control API",
    description: "API documentation for Access Control system",
  },
  host: "localhost:3000",
  schemes: ["http"],
};

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./src/app.ts"];

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  require("./src/app"); // Your project's root file
});

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(require("../swagger-output.json"))
);

app.post("/register", async (req, res) => {
  const { email, name, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 8);
  const newUser = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });
  const token = generateToken(newUser);
  res.json({ user: newUser, token });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }
  const token = generateToken(user);
  res.json({ user, token });
});

app.post("/forgot-password", async (req, res) => {
  const { email } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return res.status(404).json({ message: "User not found" });

  const resetToken = Math.random().toString(36).substring(2);
  await prisma.resetToken.create({
    data: {
      userId: user.id,
      token: resetToken,
    },
  });

  const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;
  await transporter.sendMail({
    to: email,
    subject: "Password Reset",
    html: `Click <a href="${resetUrl}">here</a> to reset your password`,
  });

  res.json({ message: "Password reset email sent" });
});

app.post("/reset-password", async (req, res) => {
  const { token, newPassword } = req.body;
  const resetToken = await prisma.resetToken.findUnique({ where: { token } });
  if (!resetToken)
    return res.status(400).json({ message: "Invalid or expired reset token" });

  const hashedPassword = await bcrypt.hash(newPassword, 8);
  await prisma.user.update({
    where: { id: resetToken.userId },
    data: { password: hashedPassword },
  });

  await prisma.resetToken.delete({ where: { id: resetToken.id } });

  res.json({ message: "Password has been reset" });
});

app.get("/me", authMiddleware, async (req, res) => {
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  res.json(user);
});

export default app;
// module.exports = app;
