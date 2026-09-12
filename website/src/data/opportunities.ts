import type { Opportunity } from "@/lib/types";
import { brand } from "@/data/site";

export const industries = [
  "Agriculture",
  "Real Estate",
  "Factories & Manufacturing",
  "Tourism & Hospitality",
  "Mineral Resources",
  "Sport & Football",
] as const;

export const opportunities: Opportunity[] = [
  {
    slug: "agriculture",
    title: "Agriculture",
    country: "Ghana",
    industry: "Agriculture",
    image:
      "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789172006/agriculture_ad0zuj.avif",
    hook: "Discover opportunities in farming, agribusiness, land, production, and agricultural development.",
    investmentLevel: "From smallholder partnerships to commercial farms",
    overview:
      "Food, cash crops, livestock, and agro-processing in Ghana. This desk is for people who want to understand how Ghanaian agriculture works - land, seasons, offtake, and the difference between a farm and a processing line - before they talk to operators.",
    location: "Ghana",
    risks: [
      "Weather, water, and harvest cycles",
      "Logistics from farm gate to port or city",
      "Land tenure and community consent",
      "Currency and input-price swings",
    ],
    requirements: [
      "A clear crop or value-chain interest",
      "Patience measured in seasons, not weeks",
      "Willingness to work with local operators and farmers",
    ],
    contact: {
      name: "Invest Desk",
      email: brand.email,
      phone: "+233 20 555 0140",
    },
    featured: true,
  },
  {
    slug: "factories",
    title: "Factories & Manufacturing",
    country: "Ghana",
    industry: "Factories & Manufacturing",
    image:
      "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789172006/manufacturing_akqjkz.avif",
    hook: "Explore Ghana's growing industrial and manufacturing landscape, from production to processing and development.",
    investmentLevel: "Typically larger tickets and longer build-out",
    overview:
      "Light manufacturing, assembly, packaging, and industrial parks in Ghana. The country still imports a great deal of what it could make at home. This brief covers how factory projects are usually structured, what power and ports matter, and how to start a conversation without a specific plant on the table.",
    location: "Ghana",
    risks: [
      "Power reliability and backup cost",
      "Import duties and local-content rules",
      "Skilled labour and equipment lead times",
    ],
    requirements: [
      "Industrial-scale capital in most cases",
      "A product or offtake idea, even if early",
      "Openness to local partners and compliance",
    ],
    contact: {
      name: "Invest Desk",
      email: brand.email,
      phone: "+233 20 555 0140",
    },
    featured: true,
  },
  {
    slug: "mineral-resources",
    title: "Mineral Resources",
    country: "Ghana",
    industry: "Mineral Resources",
    image:
      "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789172006/mineral_resources_j9d6jt.avif",
    hook: "Gain insight into Ghana's mineral-resource sector and connect with appropriate professionals and stakeholders.",
    investmentLevel: "From artisanal supply chains to licensed concessions",
    overview:
      "Gold, bauxite, manganese, salt, and other resources in Ghana. This is an educational overview of how mineral activity is regulated, why community and environment sit at the centre, and how Kin and Compass can introduce you to the right kind of conversation - not a claim on any mine.",
    location: "Ghana",
    risks: [
      "Licensing, politics, and community land rights",
      "Commodity price cycles",
      "Environmental and social obligations",
    ],
    requirements: [
      "No expectation of exclusive mineral rights through this site",
      "Independent legal and technical advice",
      "Respect for local consent processes",
    ],
    contact: {
      name: "Invest Desk",
      email: brand.email,
      phone: "+233 20 555 0140",
    },
    featured: true,
  },
  {
    slug: "tourism",
    title: "Tourism & Hospitality",
    country: "Ghana",
    industry: "Tourism & Hospitality",
    image:
      "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789172469/tourism_scne7a.avif",
    hook: "Discover investment and development opportunities within Ghana's tourism, hospitality, culture, and experiences.",
    investmentLevel: "Lodges, experiences, and supporting services",
    overview:
      "Lodges, tours, transport, and hospitality that host visitors well in Ghana. Tourism is seasonal and reputation-sensitive. This page is a general briefing on how Ghanaian tourism businesses tend to be built, staffed, and filled - and how our own travel work sits beside it.",
    location: "Ghana",
    risks: [
      "Travel demand follows global cycles",
      "Permits, land, and conservation rules",
      "Service quality lives or dies with people on the ground",
    ],
    requirements: [
      "Interest in guest experience, not only buildings",
      "Alignment with local communities where the work sits",
    ],
    contact: {
      name: "Invest Desk",
      email: brand.email,
      phone: "+233 20 555 0140",
    },
    featured: true,
  },
  {
    slug: "real-estate",
    title: "Real Estate",
    country: "Ghana",
    industry: "Real Estate",
    image:
      "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789172006/realestate_ujhpfh.avif",
    hook: "Navigate residential, commercial, land, hospitality, and development opportunities with informed local guidance.",
    investmentLevel: "Homes, rentals, and mixed-use in growing cities",
    overview:
      "Residential, rental, and mixed-use property in Ghanaian cities. Title, construction, and occupancy are the three questions that matter first. This is a general guide to how people usually approach real estate in Ghana - not a listing of units for sale.",
    location: "Ghana",
    risks: [
      "Title and permitting take time",
      "Build costs and rainy-season delays",
      "Rental demand can be neighbourhood-specific",
    ],
    requirements: [
      "Independent title and legal review",
      "A local operating partner in most cases",
    ],
    contact: {
      name: "Invest Desk",
      email: brand.email,
      phone: "+233 20 555 0140",
    },
    featured: true,
  },
  {
    slug: "football",
    title: "Sport & Football",
    country: "Ghana",
    industry: "Sport & Football",
    image:
      "https://res.cloudinary.com/dvwpuenzk/image/upload/v1789172009/football_mmd9te.webp",
    hook: "Explore opportunities across football, sports development, talent, facilities, partnerships, and the wider sports economy.",
    investmentLevel: "Academies, clubs, and related businesses",
    overview:
      "Youth academies, clubs, facilities, and the businesses around Ghanaian football. Talent is deep. This brief explains the kinds of football-related work people ask us about, and what a responsible conversation usually includes - safeguarding, education, and Ghana Football Association rules.",
    location: "Ghana",
    risks: [
      "Player development is slow and uncertain",
      "Facilities and coaching quality must be maintained",
      "Agency, transfer, and youth regulations change",
    ],
    requirements: [
      "Safeguarding and education for young players",
      "Respect for Ghana Football Association rules",
    ],
    contact: {
      name: "Invest Desk",
      email: brand.email,
      phone: "+233 20 555 0140",
    },
    featured: true,
  },
];

export function getOpportunity(slug: string) {
  return opportunities.find((o) => o.slug === slug);
}
