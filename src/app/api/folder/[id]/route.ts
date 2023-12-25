import { prisma } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
) => {
  const id = params.id;
  try {
    const folder = await prisma.library.findUnique({ where: { id } });
    return NextResponse.json({ folder });
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
