'use client';

import ImageSelector from '@/components/image-selector';
import SelectPlaceMap from '@/components/map/select-place-map';
import React, { useState } from 'react';

const PostPetPage = () => {
  const [nameIsLong, setNameIsLong] = useState(false);
  const [descriptionIsLong, setDescriptionIsLong] = useState(false);

  return (
    <form
      className="px-4 py-10 mx-auto max-w-[1200px]"
      onSubmit={e => {
        e.preventDefault();
        const form = e.target as HTMLFormElement;
        const formData = new FormData(form);
        const formDataObject = Object.fromEntries(formData.entries()) as {
          name: string;
          description: string;
          image: any;
          last_seen_date: string;
          coords_lat: string;
          coords_lng: string;
          user_phone_num: string;
        };

        const {
          name,
          description,
          last_seen_date,
          coords_lat,
          coords_lng,
          image,
          user_phone_num,
        } = formDataObject;

        // if (formDataObject.name.length > 50) {
        //   setNameIsLong(true);
        //   return;
        // } else {
        //   setNameIsLong(false);
        // }

        // if (formDataObject.description.length > 3000) {
        //   setDescriptionIsLong(true);
        //   return;
        // } else {
        //   setDescriptionIsLong(false);
        // }

        // const formatedData = {
        //   name: formDataObject.name,
        //   description: formDataObject.description,
        //   coords: {
        //     lat: +formDataObject.coords_lat,
        //     lng: +formDataObject.coords_lng,
        //   },
        //   user_phone_num: formDataObject,
        // };
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
          className="border rounded-lg block p-2 text-2xl w-full mb-2"
          required
        />
        {nameIsLong && (
          <label className="text-destructive">
            Name can't exceed 50 characters
          </label>
        )}
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
        {descriptionIsLong && (
          <label className="text-destructive">
            Description can't exceed 3000 characters
          </label>
        )}
      </div>
      <div className="mb-8">
        <label htmlFor="image" className="text-2xl block mb-2 font-bold">
          Pet image
        </label>
        <ImageSelector />
      </div>
      <div className="mb-8">
        <label
          htmlFor="last_seen_date"
          className="text-2xl block mb-2 font-bold"
        >
          Pet last seen date
        </label>
        <input
          id="last-seen-date"
          name="last_seen_date"
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
      <div className="mb-8">
        <label
          htmlFor="user_phone_num"
          className="text-2xl block mb-2 font-bold"
        >
          Phone number
        </label>
        <input
          id="user_phone_num"
          name="user_phone_num"
          type="text"
          className="border rounded-lg block p-2 text-2xl w-full mb-2"
          required
        />
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
