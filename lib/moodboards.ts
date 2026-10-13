import { readdirSync } from "node:fs";
import path from "node:path";

export type Moodboard = {
  slug: string;
  title: string;
  description: string;
};

export const moodboards: Moodboard[] = [
  { slug: "jungle", title: "Jungle", description: "The Amazon, Peruvian folk art and the cumbia amazónica roots." },
  { slug: "minimalistic", title: "Minimalistic", description: "Quiet, spacious, restrained." },
  { slug: "psychedelic", title: "Psychedelic", description: "Saturated, swirling, 1970s." },
];

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

export function getMoodboardImages(slug: string): string[] {
  return readdirSync(path.join(process.cwd(), "photos", slug))
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/photos/${slug}/${encodeURIComponent(file)}`);
}
