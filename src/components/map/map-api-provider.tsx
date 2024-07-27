'use client';

import { APIProvider } from '@vis.gl/react-google-maps';

export default function MapApiProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      {children}
    </APIProvider>
  );
}
