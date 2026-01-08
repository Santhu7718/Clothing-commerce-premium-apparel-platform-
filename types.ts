
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'Essentials' | 'Luxury' | 'Limited';
  colors: { name: string, hex: string }[];
  sizes: string[];
  imageUrl: string;
  modelColor?: string;
}

export interface CartItem extends Product {
  selectedSize: string;
  selectedColor: string;
  quantity: number;
}

export type Theme = 'dark' | 'light';

export interface User {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  role: 'customer' | 'admin' | 'co-owner';
  avatar?: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}
