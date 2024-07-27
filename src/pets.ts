export interface Pet {
  id: string;
  name: string;
  description: string;
  last_seen_location: {
    lat: number;
    lng: number;
  };
  date_lost: number;
  image_url?: string;
}
