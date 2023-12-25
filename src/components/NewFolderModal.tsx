"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useRef, useState } from "react";
import ReactSwitch from "react-switch";
import { Locale } from "../../i18n-config";

function NewFolderModal({
  t,
  locale,
  closeModal,
}: {
  t: any;
  locale: Locale;
  closeModal: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const [isPublic, setIsPublic] = useState<boolean>(false);

  const router = useRouter();

  const createFolder = async (e: FormEvent) => {
    e.preventDefault();

    const folder = {
      title: titleRef?.current?.value,
      isPublic,
    };

    const res = await fetch("/api/folder", {
      method: "POST",
      body: JSON.stringify(folder),
    });

    const createdFolder = await res.json();

    if (res.status === 201) {
      closeModal();
      router.push(`/${locale}/library/${createdFolder.id}`);
    }
  };

  return (
    <>
      <div className="bg-black z-100 w-full h-full absolute left-0 top-0  opacity-40"></div>
      <div className="bg-white px-10 py-5 border-3 border-gray-500 shadow-lg absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 rounded -6xl w-1/4">
        <div className="flex justify-between">
          <div className="font-bold flex-grow text-center text-lg">
            {t?.["new-library.text"]}
          </div>
          <div
            className="font-bold cursor-pointer text-lg"
            onClick={closeModal}
          >
            &times;
          </div>
        </div>
        <form className="flex flex-col gap-3" onSubmit={createFolder}>
          <div className="form_field">
            <label htmlFor="title" className="text-sm text-gray-800">
              {t?.["title.label"]}
            </label>
            <input
              type="text"
              className="form_input"
              id="title"
              ref={titleRef}
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
            {t?.["create.text"]}
          </button>
        </form>
      </div>
    </>
  );
}

export default NewFolderModal;
