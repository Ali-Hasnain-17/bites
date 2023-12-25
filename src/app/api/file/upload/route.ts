import { prisma } from "@/config/dbConfig";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const data: any = [
  {
    answer: " +92 3099209038",
    question: " What is Ali Hasnain's contact information?",
  },
  {
    answer: " alihascs830@gmail.com",
    question: " What is Ali Hasnain's email address?",
  },
  {
    answer:
      " Ali Hasnain studied at the National University of Science and Technology.",
    question: " Where did Ali Hasnain study?",
  },
  {
    answer:
      " Ali Hasnain earned a Bachelor of Science degree in Computer Science.",
    question: " What degree did Ali Hasnain earn?",
  },
  {
    answer: " Ali Hasnain's CGPA was 3.36/4.00.",
    question: " What was Ali Hasnain's CGPA?",
  },
  {
    answer: " Ali Hasnain is currently working at 10Pearls.",
    question: " Where is Ali Hasnain currently working?",
  },
  {
    answer: " Ali Hasnain is a Software Engineer at 10Pearls.",
    question: " What is Ali Hasnain's position at 10Pearls?",
  },
  {
    answer:
      " Ali Hasnain is a proficient Full Stack Engineer with expertise in both front-end and back-end development.",
    question: " What is Ali Hasnain's expertise?",
  },
];

async function getData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(data);
    }, 1000);
  });
}

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const session = await getServerSession();

  // const res = await fetch("http://127.0.0.1:5000/upload", {
  //   method: "POST",
  //   body: formData,
  // });

  const d: any = await getData();

  try {
    // save file information
    const file = formData.get("file") as File;
    const questionFile = await prisma.file.create({
      data: {
        name: file.name,
        libraryId: formData.get("libraryId")?.toString()!,
      },
    });

    d.forEach(async (element: any) => {
      const body = {
        ...element,
        libraryId: formData.get("libraryId")?.toString()!,
        fileId: questionFile.id!,
      };
      console.log(body);
      const question = await prisma.question.create({ data: body });
    });

    // update user documents
    const user = await prisma.user.update({
      where: { email: session?.user?.email! },
      data: { documentsUploaded: { increment: 1 } },
    });

    // update number of flashcards
    const folder = await prisma.library.update({
      where: { id: formData.get("libraryId")?.toString() },
      data: { flashCards: { increment: 1 } },
    });

    return NextResponse.json(d);
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
