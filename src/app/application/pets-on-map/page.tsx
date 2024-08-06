import React from 'react';

import type { Metadata } from 'next';

import MapApiProvider from '@/components/map/map-api-provider';
import PetsOnMap from '@/components/map/pets-on-map';

export const metadata: Metadata = {
  title: 'Pets on Map - PetFind',
};

const PetsOnMapPage = () => {
  return (
    <div className="w-full h-full p-4">
      <div className="w-full h-full rounded-md overflow-hidden">
        <MapApiProvider>
          <PetsOnMap />
        </MapApiProvider>
      </div>
    </div>
  );
};

export default PetsOnMapPage;
