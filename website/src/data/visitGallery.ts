import { covers } from "@/assets/covers";
import type { StaticImageData } from "next/image";

export type VisitSlide = {
  id: string;
  label: string;
  line: string;
  image: string | StaticImageData;
};

export const visitSlides: VisitSlide[] = [
  {
    id: "naming",
    label: "Naming ceremony",
    line: "Outdooring, kente, and the names a family speaks into a child.",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "food",
    label: "Food",
    line: "Jollof, banku, waakye, and the night markets that feed Accra.",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "nightlife",
    label: "Nightlife",
    line: "Highlife, hiplife, and rooms that do not empty until the sun is up.",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "tour",
    label: "Tour",
    line: "Nature, beach, and bus - canopy, coast, and the road between them.",
    image: covers.homepage,
  },
  {
    id: "culture",
    label: "Culture / history / Pan-African",
    line: "Castles, courts, cloth, and the wider story that Ghana still holds.",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "ancestors",
    label: "Connect to your ancestor",
    line: "Walk the door of no return with a guide who will not rush you.",
    image:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "games",
    label: "Games",
    line: "Oware in the courtyard, and football that stops a whole street.",
    image:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1800&q=80",
  },
  {
    id: "festivals",
    label: "Festivals",
    line: "Homowo, Aboakyer, chieftaincy, and the calendar that still runs the year.",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1800&q=80",
  },
];
