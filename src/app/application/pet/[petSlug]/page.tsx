import React from 'react';
import MapApiProvider from '@/components/map/map-api-provider';
import PetOnMap from '@/components/map/pet-on-map';

import { PhoneIcon } from '@heroicons/react/24/outline';
import { getPetById } from '@/actions/pets';
import { notFound } from 'next/navigation';

const PetPage = async ({ params }: { params: { petSlug: string } }) => {
  const pet = await getPetById(params.petSlug);

  if (!pet) return notFound();

  return (
    <div className="px-4 py-4 mx-auto max-w-[1200px]">
      <div className="mb-8 w-full flex justify-between">
        <p className="text-9xl font-medium">{pet.name}</p>
        <div className="flex gap-2 h-min self-end mb-3">
          <PhoneIcon className="size-10" />
          <p className="text-4xl mt-auto">{pet.user_phone_num}</p>
        </div>
      </div>
      <div className="mb-8">
        <p className="text-2xl">
          <img
            src={pet.image_url}
            alt={`Image of ${pet.name}`}
            className="w-full bg-[#f5f0ff] rounded-lg"
          />
        </p>
      </div>
      <div className="mb-8">
        <label className="text-2xl block mb-2 font-bold">Pet description</label>
        <p className="text-2xl">{pet.description}</p>
      </div>
      <div className="mb-8">
        <label className="text-2xl block mb-2 font-bold">Last seen date</label>
        <p className="text-2xl">
          {new Date(pet.date_lost).toLocaleDateString('en-GB', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
      </div>
      <div className="mb-8">
        <label className="text-2xl block mb-2 font-bold">
          Last seen location
        </label>
        <div className="w-full h-[450px] rounded-lg overflow-hidden">
          <MapApiProvider>
            <PetOnMap coords={pet.last_seen_location} />
          </MapApiProvider>
        </div>
      </div>
      <div>
        <label className="text-2xl block mb-2 font-bold">Contact</label>
        <div className="flex gap-2">
          <PhoneIcon className="size-9" />
          <p className="text-3xl mt-auto">{pet.user_phone_num}</p>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
