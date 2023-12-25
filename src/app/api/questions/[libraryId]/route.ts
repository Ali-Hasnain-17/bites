import { prisma } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  request: NextRequest,
  { params }: { params: { libraryId: string } }
) => {
  const libraryId = params.libraryId;
  try {
    const { searchParams } = new URL(request.url);

    const category = searchParams.get("category");

    let whereClause;

    if (category == undefined) {
      whereClause = {
        libraryId: libraryId,
      };
    } else {
      whereClause = {
        libraryId: libraryId,
        status: category,
      };
    }

    const questions = await prisma.question.findMany({ where: whereClause });
    return NextResponse.json({ questions });
  } catch (e: any) {
    return new Response("Internal Server Error " + e.toString(), {
      status: 500,
    });
  }
};
