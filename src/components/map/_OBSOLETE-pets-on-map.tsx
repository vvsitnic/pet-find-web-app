'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import useCoords from '@/hooks/use-coords';
import { Map } from '@vis.gl/react-google-maps';
import PetsMarkers, { PetMarkersHandle } from './_OBSOLETE-pets-markers';

const PetsOnMap = () => {
  const petMarkersRef = useRef<PetMarkersHandle>(null);
  const { coords, isLoading, isError } = useCoords();

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Loading map...</p>
      </div>
    );
  }

  if (!coords || isError) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Allow geolocation to see pets nearby</p>
      </div>
    );
  }

  const changeLocation = () => {
    if (petMarkersRef.current) {
      petMarkersRef.current.handleLocationChange();
    }
  };

  return (
    <Map
      style={{ width: '100%', height: '100%' }}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
      defaultZoom={13}
      defaultCenter={coords}
      disableDefaultUI={true}
      clickableIcons={false}
      onIdle={changeLocation}
    >
      <PetsMarkers ref={petMarkersRef} />
    </Map>
  );
};

export default PetsOnMap;
