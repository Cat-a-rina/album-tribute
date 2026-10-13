import { readdirSync } from "node:fs";
import path from "node:path";

export type Moodboard = {
  slug: string;
  /** Folder inside /photos. Kept separate so a board can be renamed without moving files. */
  folder: string;
  title: string;
  description: string;
};

export const moodboards: Moodboard[] = [
  { slug: "jungle", folder: "jungle", title: "Jungle", description: "The Amazon, Peruvian folk art and the cumbia amazónica roots." },
  { slug: "relief", folder: "minimalistic", title: "Relief", description: "Linocut and woodcut prints, duotone and one-ink risograph." },
  { slug: "psychedelic", folder: "psychedelic", title: "Psychedelic", description: "Saturated, swirling, 1970s." },
];

const IMAGE_EXT = /\.(jpe?g|png|webp|gif|avif)$/i;

export function getMoodboardImages(folder: string): string[] {
  return readdirSync(path.join(process.cwd(), "photos", folder))
    .filter((file) => IMAGE_EXT.test(file))
    .sort((a, b) => a.localeCompare(b))
    .map((file) => `/photos/${folder}/${encodeURIComponent(file)}`);
}
