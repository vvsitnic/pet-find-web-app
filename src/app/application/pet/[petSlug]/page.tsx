import MapApiProvider from '@/components/map/map-api-provider';
import PetOnMap from '@/components/map/pet-on-map';
import React from 'react';

const PetPage = ({ params }: { params: { petSlug: string } }) => {
  return (
    <div className="px-4 py-10 mx-auto max-w-[1200px]">
      <div className="mb-8">
        <label className="text-2xl block mb-2 font-bold">Pet label</label>
        <p className="text-2xl">{params.petSlug}</p>
      </div>
      <div className="mb-8">
        <label className="text-2xl block mb-2 font-bold">
          Pet last seen location
        </label>
        <div className="w-full h-[450px] rounded-lg overflow-hidden">
          <MapApiProvider>
            <PetOnMap coords={{ lat: 51.505796, lng: -0.124674 }} />
          </MapApiProvider>
        </div>
      </div>
    </div>
  );
};

export default PetPage;
