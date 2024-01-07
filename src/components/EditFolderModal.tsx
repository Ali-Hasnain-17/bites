"use client";

import { LibraryType } from "@/app/[locale]/library/page";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";
import ReactSwitch from "react-switch";
import { Locale } from "../../i18n-config";

function EditFolderModal({
  closeModal,
  library,
  t,
  locale,
}: {
  closeModal: () => void;
  library: LibraryType;
  t: any;
  locale: Locale;
}) {
  const [title, setTitle] = useState<string>(library.title);
  const [isPublic, setIsPublic] = useState<boolean>(library.isPublic);

  const router = useRouter();

  const updateFolder = async (e: FormEvent) => {
    e.preventDefault();

    const folder = {
      id: library.id,
      title,
      isPublic,
    };

    const res = await fetch("/api/folder", {
      method: "PUT",
      body: JSON.stringify(folder),
    });

    const createdFolder = await res.json();

    if (res.ok && createdFolder) {
      closeModal();
      router.refresh();
    }
  };

  return (
    <>
      <div className="bg-black z-10 w-screen h-screen absolute left-0 top-0  opacity-40"></div>
      <div className="bg-white px-10 py-5 border-3 border-gray-500 shadow-lg absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded -6xl w-1/4 z-20">
        <div className="flex justify-between">
          <div className="font-bold flex-grow text-center text-lg">
            {t?.["edit-library.text"]}
          </div>
          <div
            className="font-bold cursor-pointer text-lg"
            onClick={closeModal}
          >
            &times;
          </div>
        </div>
        <form className="flex flex-col gap-3" onSubmit={updateFolder}>
          <div className="form_field">
            <label htmlFor="title" className="text-sm text-gray-800">
              {t?.["title.label"]}
            </label>
            <input
              type="text"
              className="form_input"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex flex-row justify-between items-center my-2">
            <label htmlFor="public" className="text-sm text-gray-800">
              {t?.["public.label"]}
            </label>
            <ReactSwitch
              onColor="#3B82F6"
              uncheckedIcon={false}
              checkedIcon={false}
              checked={isPublic}
              onChange={(e) => setIsPublic(!isPublic)}
            />
          </div>
          <button className="filled_btn" type="submit">
            {t?.["edit.text"]}
          </button>
        </form>
      </div>
    </>
  );
}

export default EditFolderModal;
