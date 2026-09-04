import type { Lesson } from "@/lib/types";

export const lessonTopics = [
  "Culture",
  "History",
  "Language",
  "Destinations",
  "Travel Prep",
  "Business",
  "Geography",
  "Relocation",
] as const;

export const lessons: Lesson[] = [
  {
    slug: "greetings-in-twi",
    title: "Greetings in Twi: The First Ten Minutes",
    type: "Course",
    topic: "Language",
    country: "Ghana",
    duration: "25 min",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "Mae, mema wo akye, and why you never skip the greeting - even in a hurry on Ring Road.",
    content: [
      "In Ghana, the greeting is the doorway. Start with the time of day: mema wo akye (good morning), mema wo aha (good afternoon), mema wo adwo (good evening).",
      "If someone is working - a driver, a market seller, a guard - acknowledge the work: adwuma. The reply is often adwuma yɛ.",
      "Learn please (mepa wo kyɛw), thank you (medaase), and sorry (kafra). Tone matters more than perfect vowels.",
      "Practice: greet an elder first in a room. Sit when invited. Accept water even if you only sip.",
    ],
    featured: true,
  },
  {
    slug: "cape-coast-memory",
    title: "Cape Coast: Memory, Castle, and the Sea",
    type: "Article",
    topic: "History",
    country: "Ghana",
    duration: "12 min",
    image:
      "https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=1200&q=80",
    excerpt:
      "How to walk the castle with respect - and why Elmina and Cape Coast are not the same story.",
    content: [
      "Cape Coast Castle and Elmina Castle sit an hour apart and hold different colonial layers - Portuguese, Dutch, British - over the same Atlantic crime.",
      "Hire a Ghanaian guide. Listen more than you photograph. The door of no return is not a backdrop.",
      "Afterward, sit with the fishing harbor. Life continues. That contrast is part of what the visit teaches.",
      "Pair this lesson with our Cape Coast Heritage itinerary if you want the history held inside a well-paced day.",
    ],
    featured: true,
  },
  {
    slug: "etiquette-ghana",
    title: "Everyday Etiquette in Ghana",
    type: "Guide",
    topic: "Culture",
    country: "Ghana",
    duration: "10 min",
    image:
      "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Right hand, left hand, Sunday white, and how to refuse a second serving politely.",
    content: [
      "Give and receive with the right hand. The left is for other work. If your right is occupied, use both.",
      "Dress modestly at chiefs’ palaces, churches, and mosques. Sunday white in Accra is a language of its own.",
      "When offered food, taste. Compliment the cook. If you are full, leave a little - finishing everything can invite another plate.",
      "Ask before photographing people, especially children and ceremonies.",
    ],
    featured: true,
  },
  {
    slug: "accra-neighborhoods",
    title: "Accra by Neighborhood",
    type: "Guide",
    topic: "Destinations",
    country: "Ghana",
    duration: "15 min",
    image:
      "https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Osu, Labone, Jamestown, East Legon, and Airport City - what each is for.",
    content: [
      "Osu is walkable evenings, Oxford Street energy, and a good first base.",
      "Labone and Cantonments are leafy, residential, and close to galleries.",
      "Jamestown is the historic fishing quarter - go with a local, go in daylight first.",
      "East Legon and Airport City are newer, more international, and convenient for short business stays.",
    ],
  },
  {
    slug: "business-culture-ghana",
    title: "Doing Business: Time, Trust, and Introductions",
    type: "Article",
    topic: "Business",
    country: "Ghana",
    duration: "14 min",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Meetings start with people. Contracts follow relationships - not the other way around.",
    content: [
      "Arrive on time, then be patient. The meeting may start with family, football, and church before the agenda.",
      "A warm introduction from a trusted person is worth more than a cold deck.",
      "Confirm decisions in writing after verbal agreement. Follow up with courtesy, not pressure.",
      "Read our Invest in Ghana briefs next if you are evaluating a specific sector.",
    ],
  },
  {
    slug: "ghana-geography",
    title: "Ghana on the Map: Coast, Forest, Savanna",
    type: "Video",
    topic: "Geography",
    country: "Ghana",
    duration: "8 min",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Ten regions in the traveler’s mind: Accra, Central, Ashanti, Volta, Eastern, and the north.",
    content: [
      "The coast is humid and historic. Accra, Cape Coast, and the beach towns live with the Atlantic.",
      "Ashanti is forest, gold, and Kumasi’s markets. Volta is lake, waterfall, and highland air.",
      "The north is savanna - different food, language families, and light. Plan extra travel time.",
      "This video companion is a map you can watch before you pack.",
    ],
  },
  {
    slug: "relocate-accra",
    title: "Relocating to Accra: The First Ninety Days",
    type: "Guide",
    topic: "Relocation",
    country: "Ghana",
    duration: "18 min",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Housing, power, schools, and the documents you actually need.",
    content: [
      "Stay in a serviced apartment for the first month. Learn the commute before you sign a year lease.",
      "Budget for a backup power solution. Ask landlords about water tanks and internet providers.",
      "Ghana Immigration and your embassy should be early appointments - not afterthoughts.",
      "Join one community (church, sport, alumni) in the first two weeks. Accra is easier with people.",
    ],
    download: "Accra 90-Day Checklist",
  },
  {
    slug: "festival-calendar",
    title: "A Festival Calendar Worth Planning Around",
    type: "Article",
    topic: "Culture",
    country: "Ghana",
    duration: "9 min",
    image:
      "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Homowo, Aboakyir, Hogbetsotso, Chale Wote - when the cities change character.",
    content: [
      "Homowo in Greater Accra is harvest, family, and kpokpoi. Dates follow the Ga calendar.",
      "Aboakyir in Winneba is a deer hunt festival of speed and color.",
      "Hogbetsotso in Anloga remembers the Ewe migration. Volta trips pair well.",
      "Chale Wote in Jamestown turns the street into a contemporary art stage each August.",
    ],
  },
  {
    slug: "food-before-you-fly",
    title: "Eat Before You Arrive: A Taste Map",
    type: "Guide",
    topic: "Travel Prep",
    country: "Ghana",
    duration: "11 min",
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Jollof debates, waakye mornings, and how to order banku without hesitation.",
    content: [
      "Red red, waakye, kelewele, grilled tilapia, and light soup will find you. Say yes.",
      "Banku and okro is a texture lesson. Eat with your right hand when the table does.",
      "Street food is part of the culture. Choose busy stalls and fresh oil.",
      "Shop our Makola Shito kit if you want the flavor to travel home with you.",
    ],
  },
  {
    slug: "travel-ready-quiz",
    title: "Are You Travel-Ready? A Short Quiz",
    type: "Quiz",
    topic: "Travel Prep",
    country: "Ghana",
    duration: "6 min",
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    excerpt: "Five questions on visas, malaria, money, and manners - then a reading list.",
    content: [
      "This quiz is a checkpoint, not a test of belonging. Miss a question, open the matching lesson.",
      "Yellow fever vaccination is required for entry. Malaria prophylaxis is strongly advised.",
      "Mobile money (MoMo) is everyday infrastructure. A local SIM on day one is worth the queue.",
      "When you finish, save this lesson to your account and browse Visit Ghana itineraries.",
    ],
    featured: true,
  },
];

export const quizQuestions = [
  {
    q: "Which hand do you typically use to give or receive items in Ghana?",
    options: ["Left hand", "Right hand", "Either is fine"],
    answer: 1,
  },
  {
    q: "Which document is commonly required to enter Ghana?",
    options: ["Yellow fever certificate", "International driving permit only", "Proof of hotel stars"],
    answer: 0,
  },
  {
    q: "Cape Coast Castle and Elmina Castle are…",
    options: [
      "The same building with two names",
      "Two sites with different colonial histories",
      "Modern art museums",
    ],
    answer: 1,
  },
  {
    q: "A practical first-week money tool in Accra is…",
    options: ["Traveler’s cheques only", "Mobile money and a local SIM", "Gold dust"],
    answer: 1,
  },
  {
    q: "The best first move in a Ghanaian meeting is usually…",
    options: ["Open with the price", "Greet people and ask after them", "Hand out NDAs immediately"],
    answer: 1,
  },
];

export function getLesson(slug: string) {
  return lessons.find((l) => l.slug === slug);
}
