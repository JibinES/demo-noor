export interface ColorOption {
  name: string;
  hex: string;
  images?: string[];
}

export interface SizeChart {
  [size: string]: {
    bust?: string;
    waist?: string;
    hip?: string;
    length: string;
    sleeve?: string;
  };
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  collection?: string;
  brand: string;
  price: number;
  salePrice?: number | null;
  discountPercentage: number;
  currency: string;
  images: string[];
  thumbnail: string;
  colors: ColorOption[];
  sizes: string[];
  sizeChart?: SizeChart;
  fabric: string;
  fabricDetails: string;
  description: string;
  features: string[];
  careInstructions: string[];
  occasion: string[];
  style: string;
  neckline?: string;
  closureType?: string;
  sleeveStyle?: string;
  includedItems: string[];
  inStock: boolean;
  stockQuantity: number;
  lowStockThreshold: number;
  rating: number;
  reviewCount: number;
  tags: string[];
  weight?: number;
  dimensions?: string;
  seoTitle?: string;
  seoDescription?: string;
  seoKeywords?: string[];
  relatedProducts?: string[];
  frequentlyBoughtWith?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title?: string;
  comment: string;
  images?: string[];
  verifiedPurchase: boolean;
  sizePurchased?: string;
  fitFeedback?: 'small' | 'true' | 'large';
  helpful: number;
  notHelpful: number;
  createdAt: string;
}

export interface CartItem {
  product: Product;
  selectedColor: ColorOption;
  selectedSize: string;
  quantity: number;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  mobile: string;
  alternateMobile?: string;
  email: string;
  addressLine1: string;
  addressLine2?: string;
  landmark?: string;
  pinCode: string;
  city: string;
  state: string;
  addressType: 'home' | 'office';
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  orderNumber: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  status: 'processing' | 'packed' | 'shipped' | 'delivered' | 'cancelled';
  paymentMethod: string;
  deliveryAddress: Address;
  createdAt: string;
  updatedAt: string;
  trackingId?: string;
  estimatedDelivery?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  mobile: string;
  createdAt: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  sizes: string[];
  colors: string[];
  fabrics: string[];
  styles: string[];
  occasions: string[];
}
