import { prisma } from "@/config/dbConfig";
import bcrypt from "bcrypt";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { name, email, phoneNumber, password } = await request.json();

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        phoneNumber,
        password: hashedPassword,
      },
    });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new User", { status: 500 });
  }
};
