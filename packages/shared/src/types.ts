export type ProductCategory =
  | "Fashion"
  | "Accessories"
  | "Beauty"
  | "Art"
  | "Books"
  | "Home"
  | "Souvenirs"
  | "Food"
  | "Travel";

export type Review = {
  author: string;
  rating: number;
  date: string;
  text: string;
};

export type Product = {
  slug: string;
  name: string;
  price: number;
  compareAt?: number;
  category: ProductCategory;
  vendor: string;
  country: string;
  image: string;
  gallery: string[];
  description: string;
  details: string[];
  stock: number;
  featured?: boolean;
  rating: number;
  reviewCount: number;
  reviews: Review[];
};

export type AdminUser = {
  name: string;
  email: string;
};
