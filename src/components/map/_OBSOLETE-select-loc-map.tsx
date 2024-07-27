'use client';

import { AdvancedMarker, Map, MapEvent } from '@vis.gl/react-google-maps';
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react';
import PlaceAutocomplete from './_OBSOLETE-place-autocomplete';
import useCoords from '@/hooks/use-coords';

interface MapPorps {
  mapSize: { width: string; height: string };
}

export interface RefCoords {
  coords: { lng: number; lat: number } | null;
}

const SelectPetLocationMap = forwardRef<RefCoords, MapPorps>(
  ({ mapSize }, ref) => {
    const { coords: initialCoords, isLoading, isError } = useCoords();
    const [coords, setCoords] = useState<{ lng: number; lat: number } | null>(
      null
    );

    useImperativeHandle(ref, () => ({
      coords: coords,
    }));

    if (isLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <p>Loading map...</p>
        </div>
      );
    }

    if (!initialCoords || isError) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <p>Allow geolocation to see pets nearby</p>
        </div>
      );
    }

    const handleOnIdle = (e: MapEvent) => {
      const { map } = e;
      const newCoords = map.getCenter()!;
      const lat = newCoords.lat();
      const lng = newCoords.lng();
      setCoords({ lat, lng });
    };

    return (
      <div>
        <PlaceAutocomplete coords={coords} />
        <Map
          style={mapSize}
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
          defaultZoom={13}
          defaultCenter={initialCoords}
          disableDefaultUI={true}
          clickableIcons={false}
          onIdle={handleOnIdle}
        >
          <AdvancedMarker position={coords} />
        </Map>
      </div>
    );
  }
);

export default SelectPetLocationMap;
