'use client';

import SelectPlaceMap from '@/components/map/select-place-map';
import React from 'react';

const PostPetPage = () => {
  return (
    <form
      className="px-4 py-10 mx-auto max-w-[1200px]"
      onSubmit={e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries());
        console.log(formDataObject);
      }}
    >
      <div className="mb-8">
        <label htmlFor="name" className="text-3xl block mb-2">
          Pet name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="border rounded-lg block p-2 text-4xl w-full"
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="description" className="text-3xl block mb-2">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          className="border rounded-lg block p-2 text-2xl w-full h-96"
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="image" className="text-3xl block mb-2">
          Pet image
        </label>
        <label
          htmlFor="image"
          className="cursor-pointer border rounded-lg flex flex-col justify-center items-center h-44 w-full hover:bg-[#f5f0ff] transition-colors"
        >
          <p className="font-semibold mb-2 text-sm text-gray-500 dark:text-gray-400">
            Click to upload
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG</p>
          <input
            id="image"
            name="image"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            required
          />
        </label>
      </div>
      <div className="mb-8">
        <label htmlFor="last-seen-date" className="text-3xl block mb-2">
          Pet last seen date
        </label>
        <input
          id="last-seen-date"
          name="last-seen-date"
          type="date"
          className="border rounded-lg block p-2 text-2xl w-full"
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="last-seen-location" className="text-3xl block mb-2">
          Last seen location
        </label>
        <SelectPlaceMap mapWidth="100%" mapHeight="450px" />
      </div>
      <button
        type="submit"
        className="w-full text-white p-3 rounded-md bg-[#8a2be2] hover:bg-[#a155e8] transition-colors text-xl"
      >
        Submit
      </button>
    </form>
  );
};

export default PostPetPage;
