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
      <AdvancedMarker position={coords}>
        <div className="relative">
          <img
            src="/map-marker.png"
            className="h-14 absolute z-50 bottom-1/2 right-1/2 translate-x-1/2 pointer-events-none"
          />
          <div className="h-1 w-4 bg-black/80 blur-[2px] rounded-[100%] absolute z-40 bottom-1/2 right-1/2 translate-x-1/2 translate-y-1/2 pointer-events-none" />
        </div>
      </AdvancedMarker>
    </Map>
  );
}
