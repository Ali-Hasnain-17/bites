import { prisma } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { libraryId: string } }
) => {
  const libraryId = params.libraryId;
  try {
    const files = await prisma.file.findFirst({
      where: { libraryId: libraryId },
    });
    return NextResponse.json(files);
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
