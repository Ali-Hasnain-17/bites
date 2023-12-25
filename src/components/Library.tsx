"use client";

import { LibraryType } from "../app/[locale]/library/page";
import { useRouter } from "next/navigation";
import Dropdown from "./Dropdown";
import { useState } from "react";
import EditFolderModal from "./EditFolderModal";
import { Locale } from "../../i18n-config";

function Library({
  library,
  locale,
  t,
}: {
  library: LibraryType;
  locale: Locale;
  t: any;
}) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  function openModal() {
    setIsModalOpen(true);
  }

  async function deleteLibrary(id: string) {
    const res = await fetch("/api/folder", {
      method: "DELETE",
      body: JSON.stringify({ id }),
    });
    if (res.ok) {
      router.refresh();
    }
  }

  function handleSelect(option: string) {
    if (option === "Edit" || option === "تعديل") {
      openModal();
    }
    if (option === "Delete" || option === "حذف") {
      deleteLibrary(library.id);
    }
  }

  return (
    <>
      <div
        className="w-64 h-64 bg-white rounded-xl p-5 flex flex-col justify-between shadow-lg border border-gray-100 hover:border-blue-500 cursor-pointer"
        onClick={() => router.push(`/${locale}/library/${library.id}`)}
      >
        <div className="mb-2 flex justify-between items-center">
          <span> {library.title}</span>
          <div className="relative">
            <Dropdown
              options={locale === "en" ? ["Edit", "Delete"] : ["تعديل", "حذف"]}
              onSelect={handleSelect}
            />
          </div>
        </div>
        <hr />
        <div className="h-full flex flex-col justify-end">
          <div className="flex gap-1 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="19"
              height="24"
              viewBox="0 0 19 24"
              fill="none"
            >
              <rect
                x="1.59833"
                y="3.42218"
                width="11.0731"
                height="13.5"
                rx="2.25"
                transform="rotate(0.0234485 1.59833 3.42218)"
                fill="white"
                stroke="#11182780"
                stroke-width="1.5"
              />
              <rect
                x="7.41055"
                y="1.6353"
                width="10.3013"
                height="13.5"
                rx="2.25"
                transform="rotate(19.042 7.41055 1.6353)"
                fill="white"
                stroke="#11182780"
                stroke-width="1.5"
              />
            </svg>
            <span className="text-sm text-gray-600"> {library.flashCards}</span>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <EditFolderModal
          closeModal={() => setIsModalOpen(false)}
          library={library}
          t={t}
          locale={locale}
        />
      )}
    </>
  );
}

export default Library;
