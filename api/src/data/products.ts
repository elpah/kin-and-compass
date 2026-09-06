import type { Product } from "@kincompass/shared";

export const productCategories = [
  "Fashion",
  "Accessories",
  "Beauty",
  "Art",
  "Books",
  "Home",
  "Souvenirs",
  "Food",
  "Travel",
] as const;

export const products: Product[] = [
  {
    slug: "kente-stole",
    name: "Handwoven Kente Stole",
    price: 148,
    compareAt: 180,
    category: "Fashion",
    vendor: "Bonwire Atelier",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1618828665011-80abd347792c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A ceremonial stole woven in Bonwire, Ashanti Region. Each strip carries a proverb - wear it to graduations, naming ceremonies, or evenings that deserve presence.",
    details: [
      "Handwoven cotton-silk blend",
      "180 × 30 cm",
      "Dry clean recommended",
      "Made to order in 10-14 days when out of stock",
    ],
    stock: 14,
    featured: true,
    rating: 4.9,
    reviewCount: 38,
    reviews: [
      {
        author: "Ama Boateng",
        rating: 5,
        date: "March 2026",
        text: "The weight and color are extraordinary. I wore it to my sister’s wedding in Accra.",
      },
      {
        author: "James Okoye",
        rating: 5,
        date: "January 2026",
        text: "Arrived beautifully packed with a note on the pattern’s meaning.",
      },
    ],
  },
  {
    slug: "adinkra-pendant",
    name: "Gye Nyame Gold Pendant",
    price: 96,
    category: "Accessories",
    vendor: "Jamestown Goldsmiths",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1602173574767-37ac01994b2a?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "An 18k-gold-plated Gye Nyame pendant - except God - cast in Accra and finished by hand. A quiet statement of faith and continuity.",
    details: ["18k gold plate over brass", "45 cm chain included", "Gift box with meaning card"],
    stock: 22,
    featured: true,
    rating: 4.8,
    reviewCount: 51,
    reviews: [
      {
        author: "Nadia Mensah",
        rating: 5,
        date: "April 2026",
        text: "Everyday piece. Complements both wax print and a white shirt.",
      },
    ],
  },
  {
    slug: "shea-ritual-set",
    name: "Northern Shea Ritual Set",
    price: 54,
    category: "Beauty",
    vendor: "Tamale Collective",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8d34e258?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8d34e258?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Unrefined shea, black soap, and a drop of citrus from women-led cooperatives in the Northern Region. Skin that has known harmattan will understand.",
    details: ["200g shea butter", "150g black soap", "Citrus facial oil 30ml", "Plastic-free packaging"],
    stock: 40,
    featured: true,
    rating: 4.7,
    reviewCount: 89,
    reviews: [
      {
        author: "Elena Park",
        rating: 5,
        date: "February 2026",
        text: "The shea is the real thing - thick, nutty, and melts slowly.",
      },
    ],
  },
  {
    slug: "accra-print-tote",
    name: "Independence Arch Tote",
    price: 42,
    category: "Accessories",
    vendor: "Osu Studio",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1590874103328-eac38a941954?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1590874103328-eac38a941954?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Heavy canvas tote with an original line drawing of Independence Arch. Built for markets, campuses, and carry-on days.",
    details: ["Organic cotton canvas", "Interior pocket", "Printed in Accra"],
    stock: 31,
    rating: 4.6,
    reviewCount: 24,
    reviews: [
      {
        author: "Kojo Asare",
        rating: 4,
        date: "May 2026",
        text: "Sturdy and the print doesn’t crack. Wish it had a zipper.",
      },
    ],
  },
  {
    slug: "accra-dusk-print",
    name: "Accra Dusk - Limited Print",
    price: 120,
    category: "Art",
    vendor: "Labadi Press",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A numbered giclée of the Accra coastline at last light. Edition of 75, signed by the photographer.",
    details: ["A2 giclée on archival paper", "Unframed", "Certificate of authenticity"],
    stock: 11,
    featured: true,
    rating: 5,
    reviewCount: 12,
    reviews: [
      {
        author: "Priya Shah",
        rating: 5,
        date: "December 2025",
        text: "Hung in our living room. Guests always ask where it is.",
      },
    ],
  },
  {
    slug: "ghana-history-reader",
    name: "A Concise Ghana History Reader",
    price: 28,
    category: "Books",
    vendor: "Accra House Books",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "From the Akan states to the Fourth Republic - a clear, illustrated introduction for travelers, students, and anyone preparing to invest or relocate.",
    details: ["272 pages", "Paperback", "Maps and timeline included"],
    stock: 60,
    rating: 4.8,
    reviewCount: 44,
    reviews: [
      {
        author: "Daniel Wright",
        rating: 5,
        date: "March 2026",
        text: "Read it on the flight to Accra. Made Cape Coast land differently.",
      },
    ],
  },
  {
    slug: "bolga-basket",
    name: "Bolgatanga Market Basket",
    price: 68,
    category: "Home",
    vendor: "Upper East Weavers",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Elephant-grass basket woven in Bolgatanga. Use it for markets, laundry, or as sculpture on a bench.",
    details: ["Natural elephant grass", "Leather handles", "Each weave is unique"],
    stock: 18,
    rating: 4.9,
    reviewCount: 33,
    reviews: [
      {
        author: "Sofia Alvarez",
        rating: 5,
        date: "April 2026",
        text: "More beautiful in person. Holds an entire weekly shop.",
      },
    ],
  },
  {
    slug: "cape-coast-postcards",
    name: "Cape Coast Postcard Set",
    price: 16,
    category: "Souvenirs",
    vendor: "Castle Press",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Twelve archival postcards: the castle, the fishing harbor, Kakum’s canopy, and the road to Elmina at dusk.",
    details: ["Set of 12", "Recycled stock", "Blank interiors"],
    stock: 80,
    rating: 4.5,
    reviewCount: 19,
    reviews: [
      {
        author: "Michael Adeyemi",
        rating: 4,
        date: "June 2026",
        text: "Sent half, kept half. Colors are rich.",
      },
    ],
  },
  {
    slug: "shito-spice-kit",
    name: "Makola Shito & Spice Kit",
    price: 32,
    category: "Food",
    vendor: "Makola Pantry",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Smoked-fish shito, suya spice, and dried hibiscus - the three jars we pack for anyone leaving Ghana with a homesick kitchen.",
    details: ["Shito 200g", "Suya spice 80g", "Hibiscus 60g", "Recipe card included"],
    stock: 25,
    featured: true,
    rating: 4.9,
    reviewCount: 67,
    reviews: [
      {
        author: "Abena Sarpong",
        rating: 5,
        date: "May 2026",
        text: "The shito is dangerously close to my auntie’s. I ration it.",
      },
    ],
  },
  {
    slug: "field-journal",
    name: "Kin Field Journal",
    price: 36,
    category: "Travel",
    vendor: "Kin & Compass",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Cloth-bound journal with maps of Accra, Cape Coast, and Kumasi, plus blank pages for itineraries, language notes, and the names of people you meet.",
    details: ["192 pages", "Lay-flat binding", "Elastic closure"],
    stock: 45,
    rating: 4.7,
    reviewCount: 21,
    reviews: [
      {
        author: "Hannah Cole",
        rating: 5,
        date: "February 2026",
        text: "Used it on a ten-day trip. The city maps saved us twice.",
      },
    ],
  },
  {
    slug: "wax-print-scarf",
    name: "Ankara Horizon Scarf",
    price: 58,
    category: "Fashion",
    vendor: "Tema Print House",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1583292650898-7d22cd27ca6f?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "A silk-cotton scarf in a contemporary wax print designed for Kin & Compass. Wear it as a wrap, a headpiece, or a table runner on a picnic in Aburi.",
    details: ["90 × 90 cm", "Silk-cotton", "Hand-rolled edges"],
    stock: 20,
    rating: 4.8,
    reviewCount: 29,
    reviews: [
      {
        author: "Chioma Eze",
        rating: 5,
        date: "January 2026",
        text: "Soft enough for neck, bold enough for a look.",
      },
    ],
  },
  {
    slug: "waist-beads",
    name: "Elmina Waist Beads",
    price: 24,
    category: "Accessories",
    vendor: "Elmina Shore Collective",
    country: "Ghana",
    image:
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=1200&q=80",
    ],
    description:
      "Glass beads strung in Elmina in burgundy, gold, and cream - our brand colors, made wearable.",
    details: ["Adjustable", "Glass and brass", "Comes as a set of two"],
    stock: 35,
    rating: 4.6,
    reviewCount: 41,
    reviews: [
      {
        author: "Yaa Darko",
        rating: 5,
        date: "April 2026",
        text: "Delicate and the colors are exactly the logo. Loved that.",
      },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
