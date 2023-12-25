import { prisma } from "@/config/dbConfig";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  const { status, id } = await request.json();
  console.log(id);
  console.log(status);
  try {
    const updatedQuestion = await prisma.question.update({
      where: { id },
      data: { status },
    });
    console.log(updatedQuestion);
    return NextResponse.json(updatedQuestion);
  } catch (e) {
    return new Response("Internal Server Error", { status: 200 });
  }
};

export const GET = async (request: NextRequest) => {
  const { searchParams } = new URL(request.url);
  const libraryId = searchParams.get("library");
  try {
    const questions = await prisma.question.findMany({
      where: { libraryId: libraryId! },
    });
    let totalCards = questions.length;
    let remainingCards = 0;
    let masteredCards = 0;
    let stillLearningCards = 0;

    questions.forEach((q) => {
      if (q.status === "Remaining") {
        remainingCards++;
      }
      if (q.status === "Mastered") {
        masteredCards++;
      }
      if (q.status === "Still Learning") {
        stillLearningCards++;
      }
    });

    return NextResponse.json({
      totalCards,
      remainingCards,
      masteredCards,
      stillLearningCards,
    });
  } catch (e) {
    return new Response("Internal Server Error", { status: 200 });
  }
};
