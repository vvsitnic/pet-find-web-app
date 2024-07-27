import React from 'react';

import MapApiProvider from '@/components/map/map-api-provider';
import PetsOnMap from '@/components/map/pets-on-map';

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
