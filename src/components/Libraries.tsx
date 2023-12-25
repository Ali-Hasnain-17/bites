"use client";

import { LibraryType } from "@/app/[locale]/library/page";
import Link from "next/link";
import { useEffect, useState } from "react";
import NewFolderModal from "./NewFolderModal";
import Library from "./Library";
import { Locale } from "../../i18n-config";

function Libraries({ t, locale }: { t: any; locale: Locale }) {
  const [libraries, setLibraries] = useState<LibraryType[]>([]);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] =
    useState<boolean>(false);
  const [isClient, setIsClient] = useState(false);

  const openNewFolderModal = () => {
    setIsNewFolderModalOpen(true);
  };

  useEffect(() => {
    const fetchLibraries = async () => {
      const res = await fetch("/api/folder");
      const libraries = await res.json();
      setLibraries(libraries);
    };
    setIsClient(true);
    fetchLibraries();
  }, []);

  if (!isClient) {
    return;
  }

  return (
    <>
      <div className="w-full p-10 bg-blue-50 overflow-hidden">
        <div className="flex justify-between items-center mb-5">
          <Link href={`/${locale}/library`} className="text-xl">
            {t?.["library.text"]}
          </Link>
        </div>
        <hr />
        <div className="h-full w-full overflow-hidden py-10">
          {libraries.length === 0 ? (
            <div className="h-full w-full flex justify-center items-center text-xl font-bold tracking-widest -mt-10 -translate-x-12">
              {t?.["no-library.text"]}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-col-5 gap-2 gap-y-3">
              {libraries.map((library: LibraryType) => (
                <Library library={library} locale={locale} t={t} />
              ))}
            </div>
          )}
        </div>
        <div className="w-1/4 fixed left-1/2 -translate-x-1/2 bottom-6 p-5 bg-white rounded-2xl shadow-lg border-2 border-gray-200 flex justify-between items-center gap-3">
          <button className="filled_btn flex-grow" onClick={openNewFolderModal}>
            {t?.["create-library.text"]}
          </button>
        </div>
      </div>
      {isNewFolderModalOpen && (
        <NewFolderModal
          t={t}
          locale={locale}
          closeModal={() => setIsNewFolderModalOpen(false)}
        />
      )}
    </>
  );
}

export default Libraries;
