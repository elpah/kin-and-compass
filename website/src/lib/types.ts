export type { Product, ProductCategory, Review } from "@kincompass/shared";

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

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  image: string;
  qty: number;
};
