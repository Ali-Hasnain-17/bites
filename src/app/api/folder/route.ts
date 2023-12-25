import { prisma } from "@/config/dbConfig";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export const POST = async (request: NextRequest) => {
  const { title, isPublic } = await request.json();
  const session = await getServerSession();

  try {
    const user = await prisma.user.findFirst({
      where: { email: session?.user?.email! },
    });
    const folder = await prisma.library.create({
      data: {
        title,
        isPublic,
        userId: user?.id!,
      },
    });

    return new Response(JSON.stringify(folder), { status: 201 });
  } catch (e) {
    return new Response("Failed to create folder", { status: 500 });
  }
};

export const GET = async (request: NextRequest) => {
  const session = await getServerSession();
  try {
    const user = await prisma.user.findFirst({
      where: { email: session?.user?.email! },
    });
    const folders = await prisma.library.findMany({
      where: { userId: user?.id! },
    });
    return new Response(JSON.stringify(folders));
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const PUT = async (request: NextRequest) => {
  const { id, title, isPublic } = await request.json();
  try {
    let updatedFolder = await prisma.library.update({
      where: { id },
      data: {
        title,
        isPublic,
      },
    });
    return new Response(JSON.stringify(updatedFolder));
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};

export const DELETE = async (request: NextRequest) => {
  const { id } = await request.json();
  try {
    await prisma.library.delete({ where: { id } });
    return new Response(JSON.stringify({ message: "Deleted successfully" }));
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
