import prisma from "../../prisma/client";
import { Reader } from "../models/reader";

const createReader = async (readerData: Reader) => {
  const reader = await prisma.reader.create({
    data: readerData,
  });
  return reader;
};

// 實作其他 CRUD 操作

export default {
  createReader,
};
