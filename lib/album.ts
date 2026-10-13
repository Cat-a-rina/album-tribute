// Album facts for the tribute site. Titles and featured artists come from public listings of the 2026 release
// (Apple Music, Beatport, press). Durations are intentionally absent: they were not available from a reliable source.

export type Track = { n: number; title: string; featuring: string[] };

export const tracks: Track[] = [
  { n: 1, title: "Las Noches", featuring: ["Chicha Libre"] },
  { n: 2, title: "De Jueves a Jueves", featuring: ["Juanes"] },
  { n: 3, title: "Prieta de mi vida", featuring: ["Guaynaa"] },
  { n: 4, title: "La Fuga del Jaguar", featuring: ["Los Bitchos"] },
  { n: 5, title: "La Pena", featuring: ["La Coreañera", "Funky Munchies"] },
  { n: 6, title: "Amber", featuring: ["311", "El Dusty"] },
  { n: 7, title: "Eres Mentiroso", featuring: ["Bomba Estéreo"] },
  { n: 8, title: "Bonita", featuring: ["Big Sempa", "Toy Selectah"] },
  { n: 9, title: "Llanto en la Selva", featuring: ["LA LOM"] },
  { n: 10, title: "Cumbia Pa Olvidar", featuring: ["Mireya"] },
  { n: 11, title: "Cariñito", featuring: ["Monsieur Periné"] },
  { n: 12, title: "La Luna", featuring: ["Los Bunkers"] },
];

export const releaseDate = "May 15, 2026";
export const guestCount = tracks.reduce((sum, t) => sum + t.featuring.length, 0);

export const instruments = [
  { src: "/photos/GuitarraPrimera.png", name: "Guitarra primera", role: "Lead guitar. The reverb-soaked, surf-edged melody.", tone: "secondary" },
  { src: "/photos/guitarraSegunda.png", name: "Guitarra segunda", role: "Rhythm guitar, interlocking with the lead.", tone: "info" },
  { src: "/photos/bajoElectrica.png", name: "Bajo eléctrico", role: "The low, rolling bass line.", tone: "accent" },
  { src: "/photos/timbalBateria.png", name: "Timbal y batería", role: "Timbales and drums, the driving pulse.", tone: "secondary" },
  { src: "/photos/congas.png", name: "Congas", role: "Hand drums that keep the groove loose.", tone: "info" },
  { src: "/photos/guiro.jpg", name: "Güiro", role: "A ridged percussion tube, scraped for the rasp of cumbia.", tone: "accent" },
  { src: "/photos/maracas.png", name: "Maracas", role: "Shaken in pairs for a steady, bright rhythm.", tone: "secondary" },
  { src: "/photos/tambourineHandheld.jpg", name: "Pandereta", role: "Tambourine, the bright shimmer on top.", tone: "info" },
] as const;
