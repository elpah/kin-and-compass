import type { Tour } from "@/lib/types";

export const tourRegions = [
  "Accra",
  "Cape Coast",
  "Kumasi",
  "Volta Region",
  "Eastern Region",
  "Beach",
] as const;

export const tourTypes = [
  "Cultural",
  "Historical",
  "Nightlife",
  "Food",
  "Beach",
  "Festival",
  "Heritage",
  "Nature",
  "Private",
] as const;

export const tours: Tour[] = [
  {
    slug: "accra-city-culture",
    name: "Accra City & Culture",
    region: "Accra",
    type: "Cultural",
    duration: "3 days",
    priceFrom: 890,
    image:
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Independence Arch at golden hour, Jamestown with a local historian, Makola’s colors, and a Labone dinner that explains why Accra stays up late.",
    itinerary: [
      {
        duration: "3 days",
        title: "Arrival & Osu evening",
        detail:
          "Airport welcome, check-in, light orientation walk, and a first plate of kelewele.",
      },
      {
        duration: "5 days",
        title: "City, harbor, and museum",
        detail:
          "Kwame Nkrumah Memorial, Independence Square, National Museum, and Jamestown lighthouse.",
      },
      {
        duration: "1 Day",
        title: "Markets and departure or extend",
        detail: "Makola or Arts Centre, optional Labadi beach hour, transfer or add-on night.",
      },
    ],
    accommodation: "Boutique stay in Osu or Labone, breakfast included",
    transport: "Private air-conditioned vehicle and airport transfers",
    activities: ["Guided city walk", "Museum entry", "Market tasting", "Sunset viewpoint"],
    availability: "Weekly departures · Private groups on request",
    featured: true,
    rating: 4.9,
    reviews: [
      {
        author: "Lauren M.",
        rating: 5,
        date: "April 2026",
        text: "Felt like being shown Accra by a cousin, not a script.",
      },
    ],
  },
  {
    slug: "cape-coast-heritage",
    name: "Cape Coast Heritage",
    region: "Cape Coast",
    type: "Heritage",
    duration: "4 days",
    priceFrom: 1420,
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Castles, canopy walk, and fishing harbors. Space to feel the history and still eat by the water at night.",
    itinerary: [
      {
        duration: "1 Day",
        title: "Accra to the coast",
        detail: "Scenic drive, Elmina town walk, check-in overlooking the harbor.",
      },
      {
        duration: "1 Day",
        title: "Cape Coast Castle",
        detail: "Guided castle visit, museum, and a quiet afternoon. Optional church or beach.",
      },
      {
        duration: "1 Day",
        title: "Kakum canopy",
        detail: "Early canopy walk, forest interpretation, return via a coastal village.",
      },
      {
        duration: "1 Day",
        title: "Elmina Castle & return",
        detail: "Elmina Castle, St. George’s, lunch, drive to Accra.",
      },
    ],
    accommodation: "Sea-facing lodge, breakfast and two dinners included",
    transport: "Private vehicle from Accra and return",
    activities: ["Castle tours", "Kakum canopy walk", "Harbor walk", "Seafood dinner"],
    availability: "Year-round · Closed major public holidays on request",
    featured: true,
    rating: 5,
    reviews: [
      {
        author: "Marcus J.",
        rating: 5,
        date: "February 2026",
        text: "Our guide held the castle visit with care. The canopy day balanced the weight.",
      },
    ],
  },
  {
    slug: "kumasi-ashanti",
    name: "Kumasi & the Ashanti Kingdom",
    region: "Kumasi",
    type: "Cultural",
    duration: "3 days",
    priceFrom: 1180,
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Manhyia, kente looms in Bonwire, and Kejetia’s scale. Gold, cloth, and a city that still feels like a capital.",
    itinerary: [
      {
        duration: "1 Day",
        title: "Flight or drive to Kumasi",
        detail: "Manhyia Palace Museum and an evening in Adum.",
      },
      {
        duration: "1 Day",
        title: "Cloth and chiefs",
        detail: "Bonwire weaving demonstration, Ntonso adinkra, cultural protocol briefing.",
      },
      {
        duration: "1 Day",
        title: "Kejetia & return",
        detail: "Guided market circuit and return to Accra.",
      },
    ],
    accommodation: "City hotel near the cultural quarter, breakfast included",
    transport: "Domestic flight option or private road transfer",
    activities: ["Palace museum", "Weaving visit", "Market guide", "Local lunch"],
    availability: "Twice weekly · Festival dates sell out",
    featured: true,
    rating: 4.8,
    reviews: [
      {
        author: "Imani K.",
        rating: 5,
        date: "March 2026",
        text: "Bonwire was the highlight. I ordered a stole through the store after.",
      },
    ],
  },
  {
    slug: "volta-water-forest",
    name: "Volta Waterfalls & Lake",
    region: "Volta Region",
    type: "Nature",
    duration: "4 days",
    priceFrom: 1360,
    image:
      "https://images.unsplash.com/photo-1432405972618-c60b0195a8b5?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1432405972618-c60b0195a8b5?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Wli Falls, Mount Afadja views, and a lake crossing. Cooler air, different languages, plates of akple.",
    itinerary: [
      { duration: "1 Day", title: "Accra to Ho", detail: "Drive via the Akwapim ridge, evening in Ho." },
      { duration: "1 Day", title: "Wli Falls", detail: "Hike to the lower (and optional upper) falls." },
      { duration: "1 Day", title: "Lake & villages", detail: "Volta Lake communities and craft stops." },
      { duration: "1 Day", title: "Return", detail: "Scenic descent to Accra." },
    ],
    accommodation: "Garden lodge, breakfast and one picnic lunch",
    transport: "Private 4x4 recommended in rainy months",
    activities: ["Waterfall hike", "Lake visit", "Village walk"],
    availability: "Best November-March · Rainy season still possible",
    rating: 4.7,
    reviews: [
      {
        author: "Tom & Aisha",
        rating: 5,
        date: "January 2026",
        text: "The falls were worth every step. Guides knew when to slow us down.",
      },
    ],
  },
  {
    slug: "eastern-aburi",
    name: "Aburi Gardens & Shai Hills",
    region: "Eastern Region",
    type: "Nature",
    duration: "2 days",
    priceFrom: 540,
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "A short escape from Accra: botanical air, woodcarvers, and baboons on the rocks at Shai Hills.",
    itinerary: [
      { duration: "1 Day", title: "Aburi", detail: "Gardens, craft village, overnight in the hills." },
      { duration: "1 Day", title: "Shai Hills", detail: "Game reserve walk or drive, return to Accra." },
    ],
    accommodation: "Hill guesthouse, breakfast included",
    transport: "Private vehicle from Accra",
    activities: ["Botanical walk", "Craft village", "Wildlife reserve"],
    availability: "Daily private departures",
    rating: 4.6,
    reviews: [
      {
        author: "Chen Wei",
        rating: 4,
        date: "May 2026",
        text: "Perfect add-on after a conference. Cooler than the city.",
      },
    ],
  },
  {
    slug: "beach-escape",
    name: "Atlantic Escape - Labadi to Ada",
    region: "Beach",
    type: "Beach",
    duration: "3 days",
    priceFrom: 980,
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1519046904884-53103b34b294?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Palm, grilled fish, and the meeting of the Volta and the sea. Swim where the current allows; rest where it does not.",
    itinerary: [
      { duration: "1 Day", title: "Labadi or Bojo", detail: "Beach club day, Accra sunset." },
      { duration: "1 Day", title: "Ada Foah", detail: "River mouth, boat, and night on the sand." },
      { duration: "Half day", title: "Slow morning", detail: "Optional salt flats visit, return." },
    ],
    accommodation: "Beach lodge, breakfast included",
    transport: "Private vehicle; boat on Day 2",
    activities: ["Beach time", "River boat", "Seafood"],
    availability: "Weekends popular · Midweek quieter",
    featured: true,
    rating: 4.8,
    reviews: [
      {
        author: "Sofia R.",
        rating: 5,
        date: "April 2026",
        text: "Ada at the river mouth was the Ghana I hoped existed.",
      },
    ],
  },
  {
    slug: "accra-nights",
    name: "Accra After Dark",
    region: "Accra",
    type: "Nightlife",
    duration: "1 night",
    priceFrom: 180,
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "A curated night: live highlife or afrobeats, a rooftop, and a street-food close. You choose the volume.",
    itinerary: [
      {
        duration: "1 night",
        title: "From dinner to last song",
        detail: "Pickup from your hotel, two venues matched to your mood, safe drop-off.",
      },
    ],
    accommodation: "Not included - add to any Accra stay",
    transport: "Private night driver",
    activities: ["Live music", "Rooftop", "Late chop"],
    availability: "Thursday-Saturday",
    rating: 4.7,
    reviews: [
      {
        author: "Andre P.",
        rating: 5,
        date: "June 2026",
        text: "They knew when to leave a club. That’s rare.",
      },
    ],
  },
  {
    slug: "accra-food-tour",
    name: "Accra Food Walk",
    region: "Accra",
    type: "Food",
    duration: "1 day",
    priceFrom: 95,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1600&q=80",
    ],
    summary:
      "Waakye at the right stall, jollof that ends arguments, and a sobolo in the shade. Come hungry.",
    itinerary: [
      {
        duration: "Half day",
        title: "Five stops, one city",
        detail: "Walking and short hops across Osu and the Ridge. Dietary notes welcome.",
      },
    ],
    accommodation: "Not included",
    transport: "Walking plus spot taxi",
    activities: ["Tastings", "Market spice stall", "Recipe notes"],
    availability: "Daily except Mondays",
    rating: 4.9,
    reviews: [
      {
        author: "Nora G.",
        rating: 5,
        date: "May 2026",
        text: "Best introduction I have taken in any city.",
      },
    ],
  },
];

export function getTour(slug: string) {
  return tours.find((t) => t.slug === slug);
}
