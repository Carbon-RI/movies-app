// types/media.ts

import { MediaItem } from "@/hooks/use-fetch-media";

export interface MovieDetail extends MediaItem {
  genres: Array<{ id: number; name: string }>;
  status: string;
  budget: number;
  revenue: number;
}

export interface TVShowDetail extends MediaItem {
  genres: Array<{ id: number; name: string }>;
  status: string;
  number_of_episodes: number;
  number_of_seasons: number;
}
