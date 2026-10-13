/**
 * Tiny Desk and tour facts. Sourced from NPR's Tiny Desk coverage and public
 * tour listings (Songkick, Ticketmaster, Bandsintown) in Oct 2026. Listings
 * change, so re-check before publishing.
 */
export const tinyDesk = {
  url: "https://www.npr.org/2026/09/17/g-s1-141853/los-mirlos-tiny-desk-concert",
  posted: "September 17, 2026",
  recorded: "July 28, 2026",
  series: "El Tiny, NPR Music's Latin Music Month series",
  songs: ["La Danza de Los Mirlos", "La Fuga del Jaguar", "Llanto en la Selva", "Las Noches", "La Pandilla / Doña Guillermina"],
};

export type Show = { date: string; place: string; venue?: string };

export const tourLegs: { region: string; status: "played" | "upcoming"; shows: Show[] }[] = [
  {
    region: "North America and Europe",
    status: "played",
    shows: [
      { date: "Jun 16", place: "Chicago, IL", venue: "Park West" },
      { date: "Jun 17", place: "East Cleveland, OH", venue: "Beachland Ballroom" },
      { date: "Jun 26", place: "Toronto, Canada", venue: "TD Music Hall" },
      { date: "Jul 5", place: "Utrecht, Netherlands", venue: "TivoliVredenburg" },
      { date: "Aug 16", place: "Ventura, CA", venue: "Ventura Music Hall" },
      { date: "Aug 17", place: "Fresno, CA", venue: "Tower Theatre" },
      { date: "Aug 18", place: "San Francisco, CA", venue: "The Regency Ballroom" },
      { date: "Aug 20", place: "Portland, OR", venue: "Aladdin Theater" },
    ],
  },
  {
    region: "South America",
    status: "upcoming",
    shows: [
      { date: "Oct 17", place: "Quito, Ecuador", venue: "BASE Distrito Creativo" },
      { date: "Oct 30 to Nov 1", place: "Petrópolis, Brazil", venue: "Rock The Mountain" },
      { date: "Nov 6 to 8", place: "Petrópolis, Brazil", venue: "Rock The Mountain" },
    ],
  },
];
