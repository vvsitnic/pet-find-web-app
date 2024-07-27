'use client';

import { AdvancedMarker, Map } from '@vis.gl/react-google-maps';

export default function PetOnMap({
  coords,
}: {
  coords: { lat: number; lng: number };
}) {
  return (
    <Map
      style={{ width: '100%', height: '100%' }}
      mapId={process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID}
      defaultZoom={13}
      defaultCenter={coords}
      disableDefaultUI={true}
      clickableIcons={false}
    >
      <AdvancedMarker />
    </Map>
  );
}
