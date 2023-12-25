"use client";

import { redirect, useRouter } from "next/navigation";

export default function Home({ params }: { params: { locale: string } }) {
  const router = useRouter();

  const { locale } = params;

  redirect(`${locale}/authenticate`);
}
