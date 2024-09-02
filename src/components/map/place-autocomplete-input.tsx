'use client';

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useRef, useState } from 'react';

const PlaceAutocompleteInput = ({
  coords,
  setProgrammaticallyChanged,
  programmaticallyChanged,
}: {
  coords: { lng: number; lat: number } | null;
  setProgrammaticallyChanged: (arg: boolean) => void;
  programmaticallyChanged: boolean;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [placeAutocomplete, setPlaceAutocomplete] = useState<any>(null);

  const map = useMap();
  const placesLib = useMapsLibrary('places');
  const geocodingLib = useMapsLibrary('geocoding');

  const geocoder = useMemo(
    () => geocodingLib && new geocodingLib.Geocoder(),
    [geocodingLib]
  );

  // When coords change
  useEffect(() => {
    if (!geocoder || !map || !coords) return;

    if (programmaticallyChanged) {
      setProgrammaticallyChanged(false);
      return;
    }

    console.log('GEOCODER FUNC TRIGGERED');

    geocoder
      .geocode({ location: coords })
      .then(({ results }) => {
        if (results && results.length > 0) {
          if (inputRef.current) {
            inputRef.current.value = results[0].formatted_address;
          }
        } else {
          console.log('No results found');
        }
      })
      .catch(() => {
        console.error('Error geocoding coordinates:');
      });
  }, [
    geocoder,
    coords,
    map,
    programmaticallyChanged,
    setProgrammaticallyChanged,
  ]);

  // Set input to places autocomplete input
  useEffect(() => {
    if (!placesLib || !inputRef.current) return;

    const options = {
      fields: ['geometry', 'name', 'formatted_address'],
    };

    setPlaceAutocomplete(new placesLib.Autocomplete(inputRef.current, options));
  }, [inputRef, placesLib]);

  // Add on place selected listener
  useEffect(() => {
    if (!placeAutocomplete || !map) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();

      if (!place.geometry) return;

      setProgrammaticallyChanged(true);
      map.fitBounds(place.geometry.viewport);
    });
  }, [map, placeAutocomplete, setProgrammaticallyChanged]);

  return (
    <input
      className="border rounded-t-lg block p-2 text-2xl w-full"
      ref={inputRef}
      id="place-autocomplete"
    />
  );
};

export default PlaceAutocompleteInput;
