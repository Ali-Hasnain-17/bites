// import mongoose from "mongoose";

// // const mongoURI =
// //   "mongodb+srv://alihasnain:ahasnain@cluster0.ler7p0o.mongodb.net/?retryWrites=true&w=majority";

// const mongoURI = "mongodb://0.0.0.0:27017/bite";

// let isConnected = false; // track the connection

// export const connectToDB = async () => {
//   if (isConnected) {
//     console.log("MongoDB is already connected");
//     return;
//   }

//   try {
//     await mongoose.connect(mongoURI);
//     isConnected = true;
//     console.log("MongoDB connected");
//   } catch (error) {
//     console.log(error);
//   }
// };

import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
