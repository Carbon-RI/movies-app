// types/media.ts

import { MediaItem } from "@/hooks/use-fetch-media";

export interface MovieDetail extends MediaItem {
  overview: string;
}

export interface TVShowDetail extends MediaItem {
  overview: string;
}
