'use client';

import { useEffect, useRef, useState } from 'react';

import { Map } from '@vis.gl/react-google-maps';
import { useDebounce, useCoords } from '@/hooks';

import MapApiProvider from './map-api-provider';
import PlaceAutocompleteInput from './place-autocomplete-input';
import LoadingCircle from '../loading-sircle';

export default function SelectPlaceMap({
  mapWidth,
  mapHeight,
}: {
  mapWidth: string;
  mapHeight: string;
}) {
  const latRef = useRef<HTMLInputElement>(null);
  const lngRef = useRef<HTMLInputElement>(null);
  const { coords, isLoading, isError } = useCoords();
  const [currentCoords, setCurrentCoords] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [programmaticallyChanged, setProgrammaticallyChanged] = useState(false);

  useEffect(() => {
    if (!coords) return;

    setCurrentCoords(coords);
  }, [coords]);

  useEffect(() => {
    if (!isError) return;

    setCurrentCoords({
      lat: 51.5074,
      lng: -0.1278,
    });
  }, [isError]);

  useEffect(() => {
    if (!latRef.current || !lngRef.current || !currentCoords) return;

    latRef.current.value = currentCoords.lat.toString();
    lngRef.current.value = currentCoords.lng.toString();
  }, [currentCoords]);

  const onCenterChanged = useDebounce(center => {
    setCurrentCoords(center);
  }, 700);

  if (!currentCoords) {
    return (
      <div style={{ width: mapWidth, height: mapHeight }}>
        <LoadingCircle />
      </div>
    );
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
          setProgrammaticallyChanged={setProgrammaticallyChanged}
          programmaticallyChanged={programmaticallyChanged}
        />
        <div className="rounded-b-lg overflow-hidden relative">
          <img
            src="/map-marker.png"
            className="h-14 absolute z-50 bottom-1/2 right-1/2 translate-x-1/2 pointer-events-none"
          />
          <div className="h-1 w-4 bg-black/80 blur-[2px] rounded-[100%] absolute z-40 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 pointer-events-none" />
          <Map
            style={{ width: mapWidth, height: mapHeight }}
            mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
            defaultZoom={13}
            defaultCenter={currentCoords}
            disableDefaultUI={true}
            clickableIcons={false}
            onCenterChanged={e => {
              console.log('MAP CENTER CHANGED');

              const { center } = e.detail;
              onCenterChanged(center);
            }}
          ></Map>
        </div>
      </MapApiProvider>
      {/* These inputs are for form to retrieve on submit */}
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
