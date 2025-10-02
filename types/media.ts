// types/media.ts

import { MediaItem } from "@/hooks/use-fetch-media";

export interface MovieDetail extends MediaItem {
  genres: Array<{ id: number; name: string }>;
  status: string; // 例: 'Released'
  budget: number;
  revenue: number;
}
