'use client';

import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useRef, useState } from 'react';

const PlaceAutocompleteInput = ({
  coords,
  setProgrammaticallyChangedTrue,
  setProgrammaticallyChangedFalse,
  programmaticallyChanged,
}: {
  coords: { lng: number; lat: number } | null;
  setProgrammaticallyChangedTrue: () => void;
  setProgrammaticallyChangedFalse: () => void;
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
      setProgrammaticallyChangedFalse();
      return;
    }

    console.log(1);

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
  }, [geocoder, coords, map]);

  // Set input to places autocomplete input
  useEffect(() => {
    console.log(2);
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

      setProgrammaticallyChangedTrue();
      map.fitBounds(place.geometry.viewport);
    });
  }, [map, placeAutocomplete]);

  return (
    <input
      className="border rounded-t-lg block p-2 text-2xl w-full"
      ref={inputRef}
      id="place-autocomplete"
    />
  );
};

export default PlaceAutocompleteInput;
