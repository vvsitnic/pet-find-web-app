'use client';

import { useEffect, useRef, useState } from 'react';

import { Map } from '@vis.gl/react-google-maps';
import { useDebounce, useCoords } from '@/hooks';

import MapApiProvider from './map-api-provider';
import PlaceAutocompleteInput from './place-autocomplete-input';

export default function SelectPlaceMap({
  mapWidth,
  mapHeight,
}: {
  mapWidth: string;
  mapHeight: string;
}) {
  const latRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);
  const { coords, isLoading } = useCoords();
  const [currentCoords, setCurrentCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [programmaticallyChanged, setProgrammaticallyChanged] = useState(false);

  useEffect(() => {
    if (!latRef.current || !lngRef.current || !currentCoords) return;

    latRef.current.value = currentCoords.lat.toString();
    lngRef.current.value = currentCoords.lng.toString();
  }, [currentCoords]);

  const onCenterChanged = useDebounce(center => {
    setCurrentCoords(center);
  }, 700);

  if (isLoading) {
    return <p>Please wait...</p>;
  }

  const setProgrammaticallyChangedTrue = () => {
    setProgrammaticallyChanged(true);
  };

  const setProgrammaticallyChangedFalse = () => {
    setProgrammaticallyChanged(false);
  };

  return (
    <>
      <MapApiProvider>
        <PlaceAutocompleteInput
          coords={currentCoords}
          setProgrammaticallyChangedTrue={setProgrammaticallyChangedTrue}
          setProgrammaticallyChangedFalse={setProgrammaticallyChangedFalse}
          programmaticallyChanged={programmaticallyChanged}
        />
        <div className="rounded-b-lg overflow-hidden relative">
          <img
            src="/map-marker.png"
            className="h-14 absolute z-50 bottom-1/2 right-1/2 translate-x-1/2 pointer-events-none"
          ></img>
          <Map
            style={{ width: mapWidth, height: mapHeight }}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
            defaultZoom={13}
            defaultCenter={
              coords || {
                lat: 51.5074,
                lng: -0.1278,
              }
            }
            disableDefaultUI={true}
            clickableIcons={false}
            onCenterChanged={e => {
              const { center } = e.detail;
              onCenterChanged(center);
            }}
          ></Map>
        </div>
      </MapApiProvider>
      <input
        className="hidden"
        name="coords_lat"
        id="coords_lat"
        ref={latRef}
      />
      <input
        className="hidden"
        name="coords_lng"
        id="coords_lng"
        ref={lngRef}
      />
    </>
  );
}
