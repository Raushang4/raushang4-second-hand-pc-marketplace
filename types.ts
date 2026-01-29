
export type ProductStatus = 'AVAILABLE' | 'IN_TESTING' | 'VERIFIED' | 'FAILED_TESTING' | 'RETURNED' | 'SOLD' | 'ARCHIVED';

export interface Variation {
  id: string;
  name: string; // e.g. "16GB RAM / 256GB SSD"
  price: number;
  shippingAdvance: number;
}

export interface Product {
  id: string;
  name: string;
  chipset: string;
  vram: string; // For GPUs this is VRAM, for others it's primary spec
  price: number;
  originalPrice: number;
  shippingAdvance: number;
  seller: string;
  sellerAccountId?: string; 
  status: ProductStatus;
  stock: number;
  warranty: string;
  moneyBack: string;
  images: string[];
  category: 'GPU' | 'CPU' | 'RAM' | 'SSD' | 'MINI PC' | 'CONSOLE' | 'IPHONE' | 'PERIPHERAL';
  isFeatured?: boolean;
  variations?: Variation[];
}

export interface Review {
  id: string;
  name: string;
  comment: string;
  rating: number;
  avatar?: string;
}

export interface ConfirmedOrder {
  orderId: string;
  productName: string;
  totalPrice: number;
  advancePaid: number;
  remainingBalance: number;
  paymentId: string;
}
