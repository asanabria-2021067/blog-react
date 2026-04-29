export interface Item {
  id: number;
  title: string;
  description: string;
  body?: string;
  image?: string;
  category?: string;
  date?: string;
  created_at?: string;
  price: number;
  rating?: number;
}

export interface DiscountInfo {
  hasDiscount: boolean;
  discountPercent: number;
  originalPrice: number;
  finalPrice: number;
  reason: string | null;
}
