import prisma from "../../prisma/client";
import { User } from "../models/user";

const createUser = async (userData: User) => {
  const user = await prisma.user.create({
    data: userData,
  });
  return user;
};

// 實作其他 CRUD 操作

export default {
  createUser,
};
