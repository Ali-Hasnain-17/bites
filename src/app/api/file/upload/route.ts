import { prisma } from "@/config/dbConfig";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


// async function getData(data) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       resolve(data);
//     }, 1000);
//   });
// }

export const POST = async (request: NextRequest) => {
  const formData = await request.formData();
  const session = await getServerSession();

  const res = await fetch("http://127.0.0.1:5000/upload", {
    method: "POST",
    body: formData,
  });
  const responseData = await res.json();
  // console.log(responseData);
  // const d: any = await responseData.data(responseData);

  try {
    // save file information
    const file = formData.get("file") as File;
    const questionFile = await prisma.file.create({
      data: {
        name: file.name,
        libraryId: formData.get("libraryId")?.toString()!,
      },
    });

    responseData.forEach(async (element: any) => {
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

    return NextResponse.json(responseData);
  } catch (e) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
