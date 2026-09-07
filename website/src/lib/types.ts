export type { Product, ProductCategory, Review } from "@kincompass/shared";
import type { Review } from "@kincompass/shared";

export type Opportunity = {
  slug: string;
  title: string;
  country: string;
  industry: string;
  image: string;
  hook: string;
  investmentLevel: string;
  overview: string;
  location: string;
  risks: string[];
  requirements: string[];
  contact: { name: string; email: string; phone: string };
  featured?: boolean;
};

export type Tour = {
  slug: string;
  name: string;
  region: string;
  type: string;
  duration: string;
  priceFrom: number;
  image: string;
  gallery: string[];
  summary: string;
  itinerary: { title: string; duration: string; detail: string }[];
  accommodation: string;
  transport: string;
  activities: string[];
  availability: string;
  featured?: boolean;
  rating: number;
  reviews: Review[];
};

export type CharityProject = {
  slug: string;
  name: string;
  location: string;
  region: string;
  focus: string[];
  image: string;
  gallery: string[];
  summary: string;
  description: string;
  beneficiaries: string;
  goals: string[];
  fundingGoal: number;
  raised: number;
  timeline: string;
  status: "Funding" | "In progress" | "Completed";
  expectedImpact: string[];
  waysToSupport: string[];
  volunteer: string;
  partners: string[];
  updates: { date: string; title: string; body: string }[];
  story: { name: string; role: string; quote: string };
  featured?: boolean;
};

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};
