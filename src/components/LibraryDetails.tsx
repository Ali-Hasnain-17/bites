"use client";

import Link from "next/link";
import FileUpload from "./FileUpload";
import FlashCardGrid from "./FlashCardGrid";
import FileList from "./FileList";
import { useEffect, useState } from "react";
import { Locale } from "../../i18n-config";

const TABS_ENGLISH = ["Cards", "Files"];
const TABS_ARABIC = ["البطاقات", "الملفات"];

function LibraryDetails({
  locale,
  t,
  libraryId,
}: {
  locale: Locale;
  t: any;
  libraryId: string;
}) {
  const [library, setLibrary] = useState<any>();
  const [questions, setQuestions] = useState<any>([]);
  const [activeTab, setActiveTab] = useState(() =>
    locale === "en" ? "Cards" : "البطاقات"
  );
  const [selectedCategory, setSelectedCategory] = useState();
  const [cardNumbers, setCardNumbers] = useState({});
  const [loading, setLoading] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const TABS = locale === "en" ? TABS_ENGLISH : TABS_ARABIC;

  useEffect(() => {
    const fetchLibraryById = async (id: string) => {
      setLoading(true);
      const res = await fetch(`/api/folder/${id}`);
      const data = await res.json();
      setLibrary(data.folder);
      setLoading(false);
    };
    const fetchQuestions = async (libraryId: string) => {
      setLoading(true);
      const res = await fetch(`/api/questions/${libraryId}`);
      const data = await res.json();
      console.log(data);
      setQuestions(data.questions);
      setLoading(false);
    };
    const fetchCardNumbers = async (libraryId: string) => {
      setLoading(true);
      const res = await fetch(`/api/questions/status?library=${libraryId}`);
      const data = await res.json();
      setCardNumbers(data);
      setLoading(false);
    };
    setIsClient(true);
    fetchLibraryById(libraryId);
    fetchQuestions(libraryId);
    fetchCardNumbers(libraryId);
  }, []);

  useEffect(() => {
    const fetchQuestions = async (libraryId: string) => {
      setLoading(true);
      const res = await fetch(
        `/api/questions/${libraryId}?category=${selectedCategory}`
      );
      const data = await res.json();
      setQuestions(data.questions);
      setLoading(false);
    };
    fetchQuestions(libraryId);
  }, [selectedCategory]);

  if (!isClient) {
    return;
  }

  return (
    <div className="w-full p-10 bg-blue-50 overflow-hidden">
      <div className="flex justify-between items-center mb-5">
        <div className="flex gap-3 items-center">
          <Link href={`/${locale}/library`} className="text-xl">
            {t?.["library.text"]}
          </Link>
          <span className="text-lg">&gt;</span>
          <Link
            href={`/${locale}/library/${library?.id}`}
            className="text-xl text-blue-500"
          >
            {library?.title}
          </Link>
        </div>
      </div>
      <div className="flex gap-5 pb-2">
        {questions == null &&
          TABS.map((tab: string) => (
            <div
              onClick={(e) => setActiveTab(tab)}
              key={tab}
              className={`cursor-pointer font-bold ${
                tab === activeTab ? "text-blue-500" : "text-gray-700"
              }`}
            >
              {tab}
            </div>
          ))}
      </div>
      <hr />
      {loading && (
        <div className="flex justify-center items-center text-3xl font-bold">
          Loading Cards
        </div>
      )}
      {!loading && (activeTab === "Cards" || activeTab === "البطاقات") && (
        <div>
          {library?.flashCards === 0 ? (
            <div className="absolute top-50 translate-y-10 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-10 py-5 flex flex-col items-center gap-10 border-2 border-gray-4=200">
              <div className="text-sm text-blue-500 text-center font-extrabold">
                {t?.["upload.header"]}
              </div>
              <FileUpload
                libraryId={library?.id.toString()}
                libraryTitle={library?.title}
                t={t}
                locale={locale}
              />
            </div>
          ) : (
            <div className="w-full bg-blue-50 overflow-hidden">
              <FlashCardGrid
                library={libraryId}
                questions={questions}
                cardNumbers={cardNumbers}
                t={t}
                locale={locale}
                selectedCategory={selectedCategory}
                selectCategory={(category: any) => {
                  setSelectedCategory(category);
                }}
              />
            </div>
          )}
        </div>
      )}
      {(activeTab === "Files" || activeTab === "الملفات") && (
        <div className="flex flex-col mt-5 gap-3">
          <FileUpload
            libraryId={libraryId}
            libraryTitle={library.title}
            t={t}
            locale={locale}
          />
          <div className="mt-5 text-2xl font-bold">{t?.["files.text"]}</div>
          <FileList libraryId={libraryId} />
        </div>
      )}
    </div>
  );
}

export default LibraryDetails;
