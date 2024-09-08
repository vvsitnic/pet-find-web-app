import React from 'react';
import MapApiProvider from '@/components/map/map-api-provider';
import PetOnMap from '@/components/map/pet-on-map';

import { PhoneIcon } from '@heroicons/react/24/outline';
import { getPetById } from '@/actions/pets';
import { notFound } from 'next/navigation';

export const revalidate = 3600;

const PetPage = async ({ params }: { params: { petSlug: string } }) => {
  const pet = await getPetById(params.petSlug);

  if (!pet) return notFound();

  const date = new Date(pet.date_lost).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Thx ChatGPT for the page style
  return (
    <div className="max-w-[1200px] mx-auto my-10 p-6">
      {/* Header: Pet's Name */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{pet.name}</h1>
        <p className="text-gray-500 text-sm">Lost on: {date}</p>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-8">
        {/* Pet's Photo */}
        <div className="md:w-1/2 flex justify-center">
          <img
            className="w-full rounded-lg shadow-md aspect-[4/3] h-full"
            src={pet.image_url}
            alt={`Photo of lost pet ${pet.name}`}
          />
        </div>

        {/* Pet's Details */}
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Description
          </h2>
          <p className="text-gray-600 mb-6">{pet.description}</p>

          {/* Contact Information */}
          <div className="mb-4">
            <h3 className="text-lg font-medium text-gray-700">
              Contact Information
            </h3>
            <p className="text-gray-600">
              Phone:{' '}
              <a
                href="tel:+123456789"
                className="text-blue-500 hover:underline"
              >
                {pet.user_phone_num}
                {/* +123456789 */}
              </a>
            </p>
          </div>

          {/* Date Lost */}
          <div>
            <h3 className="text-lg font-medium text-gray-700">Date Lost</h3>
            <p className="text-gray-600">{date}</p>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">
          Location Last Seen
        </h3>
        <div className="w-full h-64 rounded-lg shadow-md overflow-hidden">
          <MapApiProvider>
            <PetOnMap coords={pet.last_seen_location} />
          </MapApiProvider>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
