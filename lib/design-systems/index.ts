import { jungle } from "./jungle";
import { minimalistic } from "./minimalistic";
import { psychedelic } from "./psychedelic";
import type { DesignSystem } from "./types";

export const designSystems: DesignSystem[] = [jungle, minimalistic, psychedelic];

export const getDesignSystem = (slug: string) => designSystems.find((s) => s.slug === slug);
