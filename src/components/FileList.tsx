"use client";

import { useEffect, useState } from "react";

function FileList({ libraryId }: { libraryId: string }) {
  const [files, setFiles] = useState<any>([]);

  useEffect(() => {
    const fetchFolders = async () => {
      const res = await fetch(`/api/file/${libraryId}`);
      const files = await res.json();
      setFiles(files);
    };
    fetchFolders();
  }, []);

  return files.map((file: any) => {
    return (
      <div className="p-3 w-full rounded-lg bg-white shadow-sm" key={file._id}>
        {file.name}
      </div>
    );
  });
}

export default FileList;
