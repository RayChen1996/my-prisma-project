import prisma from "../../prisma/client";
import { Reader } from "../models/reader";
interface ReaderData {
  name: string;
  email: string;
}

// export const createReader = async (data: ReaderData) => {
//   const { name, email } = data;
//   try {
//     const reader = await prisma.reader.create({
//       data: {

//       },
//     });
//     return reader;
//   } catch (error) {
//     console.error("Error creating reader:", error);
//     throw new Error("Failed to create reader");
//   }
// };

// 實作其他 CRUD 操作

export default {
  // createReader,
};
