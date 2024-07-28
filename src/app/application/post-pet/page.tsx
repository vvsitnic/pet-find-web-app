'use client';

import ImageSelector from '@/components/image-selector';
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
        <label htmlFor="name" className="text-2xl block mb-2 font-bold">
          Pet name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          className="border rounded-lg block p-2 text-2xl w-full"
          required
        />
      </div>
      <div className="mb-8">
        <label htmlFor="description" className="text-2xl block mb-2 font-bold">
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
        <label htmlFor="image" className="text-2xl block mb-2 font-bold">
          Pet image
        </label>
        <ImageSelector />
      </div>
      <div className="mb-8">
        <label
          htmlFor="last-seen-date"
          className="text-2xl block mb-2 font-bold"
        >
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
        <label
          htmlFor="last-seen-location"
          className="text-2xl block mb-2 font-bold"
        >
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
