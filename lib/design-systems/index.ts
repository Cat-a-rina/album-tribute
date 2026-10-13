import { jungle } from "./jungle";
import { relief } from "./relief";
import { psychedelic } from "./psychedelic";
import type { DesignSystem } from "./types";

export const designSystems: DesignSystem[] = [jungle, relief, psychedelic];

export const getDesignSystem = (slug: string) => designSystems.find((s) => s.slug === slug);
