
import { Product, Review } from './types';

// Environment variables pulled from .env
// We check both VITE_ prefixed and standard versions for maximum compatibility
export const WHATSAPP_NUMBER = process.env.VITE_WHATSAPP_SENDER_ID || process.env.WHATSAPP_SENDER_ID || "";
export const RAZORPAY_KEY = process.env.VITE_RAZORPAY_KEY_ID || process.env.RAZORPAY_KEY_ID || "";

export const PRODUCTS: Product[] = [
  {
    id: 'gpu-2080ti-gigabyte',
    name: 'GIGABYTE RTX 2080 Ti GAMING OC 11GB Used GPU',
    chipset: 'Nvidia RTX 20 Series',
    vram: '11GB GDDR6',
    price: 21999,
    originalPrice: 51999,
    shippingAdvance: 800,
    seller: 'raushang4.in Verified',
    sellerAccountId: 'acc_LQY_VEND_001',
    status: 'IN_TESTING',
    stock: 7,
    warranty: '30 Days Replacement Warranty',
    moneyBack: '100% Health Guaranteed',
    category: 'GPU',
    isFeatured: true,
    images: ['https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'mini-pc-hp-elitedesk',
    name: 'HP Elitedesk Mini PC | i5 8500T',
    chipset: 'Intel i5 8th Gen',
    vram: 'Select Configuration',
    price: 14499,
    originalPrice: 28000,
    shippingAdvance: 500,
    seller: 'Krill Kaput (Verified)',
    sellerAccountId: 'acc_LQY_VEND_002',
    status: 'AVAILABLE',
    stock: 2,
    warranty: '6 Months Warranty',
    moneyBack: 'Verified Performance',
    category: 'MINI PC',
    images: ['https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=800'],
    variations: [
      { id: 'v1', name: '16GB RAM / 256GB NVMe', price: 12499, shippingAdvance: 400 },
      { id: 'v2', name: '32GB RAM / 512GB NVMe', price: 14499, shippingAdvance: 500 },
      { id: 'v3', name: '64GB RAM / 1TB NVMe', price: 18999, shippingAdvance: 700 }
    ]
  },
  {
    id: 'gpu-1660-super',
    name: 'Nvidia GTX 1660 Super Used GPU',
    chipset: 'Nvidia GTX',
    vram: '6GB GDDR6',
    price: 9499,
    originalPrice: 16999,
    shippingAdvance: 400,
    seller: 'Food Instore Marketplace',
    status: 'AVAILABLE',
    stock: 3,
    warranty: '7 Days Testing',
    moneyBack: 'Temps under 80°C Verified',
    category: 'GPU',
    images: ['https://images.unsplash.com/photo-1555617766-c94804975da3?auto=format&fit=crop&q=80&w=800']
  },
  {
    id: 'cpu-i5-3470',
    name: 'Intel Core i5-3470 Processor',
    chipset: 'LGA 1155',
    vram: '3.20 GHz Quad Core',
    price: 1899,
    originalPrice: 4500,
    shippingAdvance: 200,
    seller: 'Verified Inventory',
    status: 'AVAILABLE',
    stock: 12,
    warranty: '3 Years Warranty',
    moneyBack: 'Stress Tested',
    category: 'CPU',
    images: ['https://images.unsplash.com/photo-1591405351990-4726e331f141?auto=format&fit=crop&q=80&w=800']
  }
];

export const MAIN_PRODUCT = PRODUCTS[0];

export const REVIEWS: Review[] = [
  { id: '1', name: 'Kavya Mali', comment: 'Everything was great but I had to contact them manually for my money. Hopefully they automate it!', rating: 4 },
  { id: '2', name: 'Amit Debnath', comment: 'Really a good and dependable place to sell used PC components.', rating: 5 },
  { id: '3', name: 'Aryan Singh', comment: 'Ordered a 3090, runs really well. Owner was very cooperative throughout.', rating: 5 },
  { id: '4', name: 'Yashwanth Gowda', comment: 'Best place to buy used GPU, I bought 3080 working like butter.', rating: 5 }
];

export const LEGAL_DISCLAIMER = "Secure checkout via Razorpay. Balance is collected via Cash on Delivery (COD). Hybrid COD Advance covers shipping/escrow.";
