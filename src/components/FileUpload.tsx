"use client";

import { useRouter } from "next/navigation";
import { DragEvent, useRef, useState } from "react";
import { Locale } from "../../i18n-config";

function FileUpload({
  libraryId,
  libraryTitle,
  t,
  locale,
}: {
  libraryId: string;
  libraryTitle: string;
  t: any;
  locale: Locale;
}) {
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadFile = async (file: File) => {
    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("libraryId", libraryId);
    formData.append("libraryTitle", libraryTitle);

    const res = await fetch("/api/file/upload", {
      method: "POST",
      body: formData,
    });

    const qa = await res.json();
    setIsUploading(false);
    router.refresh();
    router.push(`/${locale}/library/${libraryId}`);
  };

  const onDragOver = (e: DragEvent<HTMLDivElement>) => {
    setIsDragging(true);
    e.stopPropagation();
    e.preventDefault();
    if (e.dataTransfer != null) {
      e.dataTransfer.dropEffect = "copy";
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    setIsDragging(false);

    if (file.type === "application/pdf") {
      uploadFile(file);
    } else {
      console.log("Invalid File");
    }
  };

  return (
    <>
      {isUploading && (
        <div className="text-blue-500 text-lg font-bold text-center">
          Uploading File... It may take few minutes
        </div>
      )}
      <div
        className={`border-2 border-dashed border-blue-500 w-full rounded-3xl p-10 flex flex-col justify-center items-center ${
          isDragging && "bg-blue-200"
        }`}
        onDragLeave={(e) => setIsDragging(false)}
        onDragOver={(e) => setIsDragging(true)}
      >
        <div
          className="flex flex-col gap-5 items-center w-full h-full"
          onDragOver={onDragOver}
          onDrop={handleDrop}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="119"
            height="106"
            viewBox="0 0 119 106"
            fill="none"
          >
            <path
              d="M0.500488 59.8424C0.500488 72.0851 10.7039 81.937 26.0803 81.937H55.2412V101.561C55.2412 103.814 57.1844 105.735 59.5379 105.735C61.883 105.735 63.788 103.814 63.788 101.561V81.937H95.5548C109.249 81.937 118.469 73.5177 118.469 62.0171C118.469 52.4735 112.859 44.0126 103.714 40.2782C103.773 19.357 88.7032 4.27002 69.3752 4.27002C57.0491 4.27002 47.8543 10.6599 42.0585 19.031C31.109 16.3061 18.0436 24.6234 17.6129 37.7116C7.05074 39.5538 0.500488 48.8947 0.500488 59.8424ZM55.2412 79.5217V56.1886L55.5768 49.3298L53.3362 52.0807L46.2286 59.6405C45.4898 60.4648 44.3733 60.9019 43.3368 60.9019C41.2125 60.9019 39.5432 59.3461 39.5432 57.2184C39.5432 56.0748 40.0009 55.2504 40.7774 54.4723L56.2998 39.5001C57.3903 38.4072 58.3925 38.0246 59.5379 38.0246C60.6371 38.0246 61.6389 38.4072 62.7381 39.5001L78.2521 54.4723C79.0287 55.2504 79.4862 56.0748 79.4862 57.2184C79.4862 59.3461 77.741 60.9019 75.6546 60.9019C74.6184 60.9019 73.5397 60.4648 72.8093 59.6405L65.6934 52.0807L63.4528 49.3298L63.788 56.1886V79.5217C63.788 81.8924 61.8582 83.7884 59.5379 83.7884C57.1714 83.7884 55.2412 81.8924 55.2412 79.5217Z"
              fill="#6061F0"
              fill-opacity="0.12"
            />
          </svg>
          <div className="text-gray-500 font-bold">{t?.["d&d.text"]}</div>
          <div className="w-1/2 flex items-center gap-2">
            <div className="border-b border-gray-500 h-0 w-64"></div>
            <span className="text-xs font-bold">{t?.["or.text"]}</span>
            <div className="border-b border-gray-500 h-0 w-64"></div>
          </div>
          <button
            className="filled_btn w-1/2"
            onClick={() => fileInputRef.current?.click()}
          >
            {t?.["upload-btn.text"]}
          </button>
        </div>
        <input
          type="file"
          accept="application/pdf"
          ref={fileInputRef}
          className="hidden"
          onChange={(e) =>
            e.target.files?.[0] != undefined && uploadFile(e.target.files[0])
          }
        />
      </div>
    </>
  );
}

export default FileUpload;
