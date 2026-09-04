import { covers } from "@/assets/covers";

export const brand = {
  name: "Kin and Compass",
  legal: "Kin and Compass Travel and Tour",
  tagline: "Travel And Tour",
  phone: "+233 20 555 0100",
  whatsapp: "233205550100",
  email: "hello@kinandcompass.com",
  address: "Osu, Accra, Ghana",
};

export const nav = [
  { href: "/about", label: "About" },
  { href: "/stores", label: "Stores" },
  { href: "/invest", label: "Invest in Ghana" },
  { href: "/learning", label: "Learning" },
  { href: "/travel", label: "Visit Ghana" },
  { href: "/charity", label: "Charity" },
  { href: "/contact", label: "Contact" },
];

export const investFaqs = [
  {
    q: "Is this investment advice?",
    a: "No. Kin and Compass publishes educational briefs and introductions. Nothing on this site is an offer to sell securities or a recommendation to invest. Always consult licensed advisers in your jurisdiction.",
  },
  {
    q: "Can foreigners invest in Ghana?",
    a: "Yes, subject to Ghana Investment Promotion Centre rules, sector minimums, and immigration status. We introduce opportunities and local counsel - we do not replace them.",
  },
  {
    q: "What happens after I submit an inquiry?",
    a: "A partnerships lead replies within two business days with questions, a disclaimer pack, and - if relevant - a call. Featured guides are available as PDFs after you share your interest area.",
  },
  {
    q: "Will there be investor accounts?",
    a: "A future version of the platform may include dashboards. Today, all conversations happen by email, call, or WhatsApp.",
  },
];

export const whyGhana = [
  {
    title: "A known rulebook",
    text: "Foreign participation sits under the Ghana Investment Promotion Centre, not a handshake. Sector minimums, local partners, and immigration status are written down. You still need counsel. You do not have to invent the map.",
  },
  {
    title: "English, and a working door",
    text: "Business, courts, and contracts run in English. Accra, Tema, and Takoradi are ports and cities you can fly into, walk, and leave with questions that have names - not a continent-sized abstraction.",
  },
  {
    title: "A young country that still imports",
    text: "Food, packaging, parts, and hospitality are growing faster than the factories and farms that could supply them. That gap is why people look at agriculture, plants, and lodges - and why patience matters more than a pitch.",
  },
  {
    title: "Home for the diaspora",
    text: "Many who write to this desk already know Ghana. Dual citizenship, family land, and a return after years away are ordinary here. We treat that as an advantage - and as a reason to go slowly on title and community consent.",
  },
];

export const travelFaqs = [
  {
    q: "Do you take deposits online?",
    a: "You can request a booking now. Online deposits and full payments are being enabled - until then we confirm by invoice and secure transfer.",
  },
  {
    q: "Can you plan a private itinerary?",
    a: "Yes. Use the custom-trip form with dates, budget, group size, and interests. We reply with a draft within 48 hours.",
  },
  {
    q: "Are flights included?",
    a: "International flights are not included unless stated. Domestic flights and private road transfers are itemized on each tour page.",
  },
  {
    q: "Is Ghana safe for first-time visitors?",
    a: "Millions visit each year. We brief you on neighborhoods, malaria prevention, and respectful photography. Common-sense city caution applies, as anywhere.",
  },
];

export const charityFaqs = [
  {
    q: "Is this a registered NGO?",
    a: "Kin and Compass Travel and Tour runs the Give Back desk from Accra. Registered charity details, where applicable, are published on the Trust page as filings complete. We will not invent a registration number.",
  },
  {
    q: "How are donations used?",
    a: "Until the first programmes are named, gifts go to the Ghana fund. We publish a simple split: most of every gift is meant for programme work, a smaller share for operations and an emergency reserve. Live project pages will appear when there is work to show.",
  },
  {
    q: "Will I get a receipt?",
    a: "Yes. You receive an on-screen confirmation and a record in your account. Tax treatment depends on your country and our registration status - we do not promise a tax deduction.",
  },
  {
    q: "Can I volunteer or partner instead of giving money?",
    a: "Yes. Use Get Involved to donate, volunteer, partner, or fundraise. Volunteer placements are scheduled and screened. We do not send unvetted visitors to children's homes.",
  },
];

export const pillars = [
  {
    href: "/travel",
    kicker: "Visit Ghana",
    title: "Travel",
    text: "Tours, heritage routes, beaches, and nights in Accra - paced by people who live here.",
    image: covers.travel,
  },
  {
    href: "/stores",
    kicker: "Marketplace",
    title: "Shop",
    text: "Cloth, shea, spice, and objects made by Ghanaian ateliers - shipped with their stories.",
    image: covers.shop,
  },
  {
    href: "/learning",
    kicker: "Prepare well",
    title: "Learn",
    text: "Language, etiquette, history, and relocation notes so you arrive already listening.",
    image: covers.learn,
  },
  {
    href: "/invest",
    kicker: "Opportunity",
    title: "Invest",
    text: "Agriculture, factories, mineral resources, tourism, real estate, and football in Ghana.",
    image: covers.invest,
  },
  {
    href: "/charity",
    kicker: "Give back",
    title: "Charity",
    text: "Education, water, health, and community work in Ghana - a desk being built, and a call for support.",
    image: covers.impact,
  },
];
