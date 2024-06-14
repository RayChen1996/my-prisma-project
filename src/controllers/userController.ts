import { Request, Response } from "express";
import userService from "../services/userService";
import prisma from "../../prisma/client"; // 確保這個路徑正確
export const createUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;
  console.log(name);
  console.log(email);
  console.log(password);

  try {
    const user = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: password,
      },
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany(); // 使用 Prisma 客戶端查詢所有用戶
    res.json(users); // 將用戶數據返回為 JSON 格式
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// 實作其他 CRUD 操作
