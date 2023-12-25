import { prisma } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const questions = await prisma.question.findMany();
    return NextResponse.json(questions);
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
