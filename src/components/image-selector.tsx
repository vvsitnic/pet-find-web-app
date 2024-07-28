'use client';

import React, { ChangeEvent, useState } from 'react';

const ImageSelector = () => {
  const [file, setFile] = useState<string | null>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(URL.createObjectURL(e.target.files[0]));
    }
  }

  return (
    <div className="inline-block relative w-full">
      <div className="border rounded-lg hover:bg-[#f5f0ff] transition-colors flex flex-col justify-center items-center h-52">
        {file && (
          <img
            src={file}
            className="object-cover aspect-[4/3] h-28 mb-2 rounded-md"
          />
        )}
        <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">
          Click to upload
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
        <input
          type="file"
          accept="image/png, image/jpeg"
          id="image"
          name="image"
          required
          className="opacity-0 w-full h-full absolute left-0 top-0 cursor-pointer"
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default ImageSelector;
