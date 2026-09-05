import naming1 from "@/assets/images/tours_pulse_section/naming/naming1.webp";
import namingCover from "@/assets/images/tours_pulse_section/naming/naming_cover.webp";
import food1 from "@/assets/images/tours_pulse_section/foods/food1.webp";
import food2 from "@/assets/images/tours_pulse_section/foods/food2.webp";
import food3 from "@/assets/images/tours_pulse_section/foods/food3.webp";
import foodCover from "@/assets/images/tours_pulse_section/foods/food_cover.webp";
import night1 from "@/assets/images/tours_pulse_section/night/night1.webp";
import night2 from "@/assets/images/tours_pulse_section/night/night2.webp";
import night3 from "@/assets/images/tours_pulse_section/night/night3.webp";
import night4 from "@/assets/images/tours_pulse_section/night/night4.webp";
import night5 from "@/assets/images/tours_pulse_section/night/night5.webp";
import night6 from "@/assets/images/tours_pulse_section/night/night6.webp";
import night7 from "@/assets/images/tours_pulse_section/night/night7.webp";
import night8 from "@/assets/images/tours_pulse_section/night/night8.webp";
import nightCover from "@/assets/images/tours_pulse_section/night/night_cover.webp";
import tourist1 from "@/assets/images/tours_pulse_section/tourist/tourist1.webp";
import tourist2 from "@/assets/images/tours_pulse_section/tourist/tourist2.webp";
import tourist3 from "@/assets/images/tours_pulse_section/tourist/tourist3.webp";
import tourist4 from "@/assets/images/tours_pulse_section/tourist/tourist4.webp";
import tourist5 from "@/assets/images/tours_pulse_section/tourist/tourist5.webp";
import tourist6 from "@/assets/images/tours_pulse_section/tourist/tourist6.webp";
import tourist7 from "@/assets/images/tours_pulse_section/tourist/tourist7.webp";
import tourist8 from "@/assets/images/tours_pulse_section/tourist/tourist8.webp";
import tourist9 from "@/assets/images/tours_pulse_section/tourist/tourist9.webp";
import tourist10 from "@/assets/images/tours_pulse_section/tourist/tourist10.webp";
import touristCover from "@/assets/images/tours_pulse_section/tourist/tourist_cover.webp";
import festival1 from "@/assets/images/tours_pulse_section/festival/festival1.webp";
import festival2 from "@/assets/images/tours_pulse_section/festival/festival2.webp";
import festival3 from "@/assets/images/tours_pulse_section/festival/festival3.webp";
import festival4 from "@/assets/images/tours_pulse_section/festival/festival4.webp";
import festival5 from "@/assets/images/tours_pulse_section/festival/festival5.webp";
import festival6 from "@/assets/images/tours_pulse_section/festival/festival6.webp";
import festivalCover from "@/assets/images/tours_pulse_section/festival/festival_cover.webp";
import games1 from "@/assets/images/tours_pulse_section/games/games1.webp";
import games2 from "@/assets/images/tours_pulse_section/games/games2.webp";
import gamesCover from "@/assets/images/tours_pulse_section/games/games_cover.webp";
import learnCover from "@/assets/images/cover_images/learn_cover.webp";
import ancestors1 from "@/assets/images/tours_pulse_section/connect_to_ancestors/connect_to_ancestors1.webp";
import ancestors2 from "@/assets/images/tours_pulse_section/connect_to_ancestors/connect_to_ancestors2.webp";
import ancestorsCover from "@/assets/images/tours_pulse_section/connect_to_ancestors/connect_to_ancestors_cover.webp";
import type { StaticImageData } from "next/image";

export type VisitCategory = {
  id: string;
  label: string;
  line: string;
  images: (string | StaticImageData)[];
};

export const visitCategories: VisitCategory[] = [
  {
    id: "naming",
    label: "Naming ceremony",
    line: "Outdooring, kente, and the names a family speaks into a child.",
    images: [namingCover, naming1],
  },
  {
    id: "food",
    label: "Food",
    line: "Jollof, banku, waakye, and the night markets that feed Accra.",
    images: [foodCover, food1, food2, food3],
  },
  {
    id: "nightlife",
    label: "Nightlife",
    line: "Highlife, hiplife, and rooms that do not empty until the sun is up.",
    images: [nightCover, night1, night2, night3, night4, night5, night6, night7, night8],
  },
  {
    id: "tour",
    label: "Tour",
    line: "Nature, beach, and bus - canopy, coast, and the road between them.",
    images: [
      touristCover,
      tourist1,
      tourist2,
      tourist3,
      tourist4,
      tourist5,
      tourist6,
      tourist7,
      tourist8,
      tourist9,
      tourist10,
    ],
  },
  {
    id: "learning",
    label: "Learning",
    line: "Language, etiquette, and history - so you arrive already listening.",
    images: [
      learnCover,
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1800&q=80",
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1800&q=80",
    ],
  },
  {
    id: "culture",
    label: "Culture / history / Pan-African",
    line: "Castles, courts, cloth, and the wider story that Ghana still holds.",
    images: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1800&q=80",
    ],
  },
  {
    id: "ancestors",
    label: "Connect to your ancestor",
    line: "Walk the door of no return with a guide who will not rush you.",
    images: [ancestorsCover, ancestors1, ancestors2],
  },
  {
    id: "games",
    label: "Games",
    line: "Oware in the courtyard, and football that stops a whole street.",
    images: [gamesCover, games1, games2],
  },
  {
    id: "festivals",
    label: "Festivals",
    line: "Homowo, Aboakyer, chieftaincy, and the calendar that still runs the year.",
    images: [festivalCover, festival1, festival2, festival3, festival4, festival5, festival6],
  },
];
