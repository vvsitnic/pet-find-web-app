import { useMap, useMapsLibrary } from '@vis.gl/react-google-maps';
import { useEffect, useMemo, useRef, useState } from 'react';

export default function PlaceAutocomplete({
  coords,
}: {
  coords: { lng: number; lat: number } | null;
}) {
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
    console.log(1);
    if (!geocoder || !map || !coords) return;

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

  // When place was selected
  useEffect(() => {
    if (!placeAutocomplete || !map) return;

    placeAutocomplete.addListener('place_changed', () => {
      const place = placeAutocomplete.getPlace();

      if (!place.geometry) return;

      map.fitBounds(place.geometry.viewport);
    });
  }, [map, placeAutocomplete]);

  return (
    <>
      <label htmlFor="place-autocomplete" className="block text-2xl mb-1">
        Select last seen location
      </label>
      <input
        className="w-full text-lg p-2 rounded-t-lg border border-[#7e7e7e]"
        ref={inputRef}
        id="place-autocomplete"
      />
    </>
  );
}
