import { Product } from '@/lib/types';

// Helper function to generate fashion images using Picsum Photos
const getModestFashionImage = (category: string, variant: string = '', width: number = 800, height: number = 1000) => {
  // Create unique seeds for different categories and variants to get varied images
  const variantNum = variant ? parseInt(variant.replace(/\D/g, '')) || 1 : 1;

  // Different base numbers for each category to ensure variety
  const categorySeeds: Record<string, number> = {
    'abayas': 100,
    'burkhas': 200,
    'hijabs': 300,
    'maxi-dresses': 400,
  };

  const baseSeed = categorySeeds[category] || 100;
  const finalSeed = baseSeed + variantNum;

  // Use Picsum Photos with unique seeds for reliable, varied images
  return `https://picsum.photos/seed/fashion-${category}-${finalSeed}/${width}/${height}`;
};

export const products: Product[] = [
  // ABAYAS - Front Open
  {
    id: 'abaya-001',
    sku: 'NMW-AB-FO-001',
    name: 'Elegant Front Open Abaya with Embroidery',
    slug: 'elegant-front-open-abaya-embroidery',
    category: 'abayas',
    subcategory: 'front-open',
    collection: 'designer',
    brand: 'Noor Modest Wear',
    price: 2499,
    salePrice: null,
    discountPercentage: 0,
    currency: 'INR',
    images: [
      getModestFashionImage('abayas', '1'),
      getModestFashionImage('abayas', '2'),
      getModestFashionImage('abayas', '3'),
    ],
    thumbnail: getModestFashionImage('abayas', '1', 400, 500),
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy Blue', hex: '#1E3A5F' },
      { name: 'Burgundy', hex: '#7F1D1D' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    sizeChart: {
      S: { bust: '36', length: '54', sleeve: '22' },
      M: { bust: '38', length: '55', sleeve: '23' },
      L: { bust: '40', length: '56', sleeve: '24' },
      XL: { bust: '42', length: '57', sleeve: '25' },
      XXL: { bust: '44', length: '58', sleeve: '26' },
    },
    fabric: 'Premium Nida',
    fabricDetails: '100% Polyester, Breathable, Opaque, Wrinkle-resistant',
    description: 'This elegant front-open abaya features intricate embroidery on the front panel and sleeves. Perfect for special occasions and daily wear. The premium Nida fabric ensures comfort and modesty throughout the day.',
    features: [
      'Front zipper closure',
      'Side pockets',
      'Elasticated sleeves',
      'Matching dupatta included',
      'Machine washable',
    ],
    careInstructions: [
      'Machine wash cold',
      'Do not bleach',
      'Iron on low heat',
      'Dry in shade',
    ],
    occasion: ['daily-wear', 'formal', 'office'],
    style: 'embroidered',
    neckline: 'Round neck with collar',
    closureType: 'Front zipper',
    sleeveStyle: 'Full sleeves with elastic',
    includedItems: ['Abaya', 'Matching Dupatta'],
    inStock: true,
    stockQuantity: 45,
    lowStockThreshold: 10,
    rating: 4.7,
    reviewCount: 128,
    tags: ['bestseller', 'premium'],
    createdAt: '2025-10-01T10:00:00Z',
    updatedAt: '2025-11-15T14:30:00Z',
  },
  {
    id: 'abaya-002',
    sku: 'NMW-AB-FO-002',
    name: 'Classic Black Front Open Abaya',
    slug: 'classic-black-front-open-abaya',
    category: 'abayas',
    subcategory: 'front-open',
    collection: 'everyday',
    brand: 'Noor Modest Wear',
    price: 1799,
    salePrice: 1499,
    discountPercentage: 17,
    currency: 'INR',
    images: [
      getModestFashionImage('abayas', '4'),
      getModestFashionImage('abayas', '5'),
    ],
    thumbnail: getModestFashionImage('abayas', '4', 400, 500),
    colors: [
      { name: 'Black', hex: '#000000' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Nida',
    fabricDetails: 'Soft, comfortable Nida fabric with excellent drape',
    description: 'Timeless classic black abaya perfect for everyday wear. Simple, elegant, and effortlessly modest.',
    features: [
      'Front zipper',
      'Two side pockets',
      'Elasticated sleeves',
      'Lightweight fabric',
    ],
    careInstructions: ['Machine wash cold', 'Iron on low', 'Hang to dry'],
    occasion: ['daily-wear', 'casual'],
    style: 'plain',
    closureType: 'Front zipper',
    includedItems: ['Abaya'],
    inStock: true,
    stockQuantity: 120,
    lowStockThreshold: 15,
    rating: 4.6,
    reviewCount: 256,
    tags: ['bestseller', 'new-arrival'],
    createdAt: '2025-11-01T10:00:00Z',
    updatedAt: '2025-11-18T09:00:00Z',
  },
  // ABAYAS - Umbrella Style
  {
    id: 'abaya-003',
    sku: 'NMW-AB-UM-001',
    name: 'Flared Umbrella Abaya with Lace Detail',
    slug: 'flared-umbrella-abaya-lace',
    category: 'abayas',
    subcategory: 'umbrella',
    collection: 'designer',
    brand: 'Noor Modest Wear',
    price: 2899,
    salePrice: 2499,
    discountPercentage: 14,
    currency: 'INR',
    images: [
      getModestFashionImage('abayas', '6'),
      getModestFashionImage('abayas', '7'),
    ],
    thumbnail: getModestFashionImage('abayas', '6', 400, 500),
    colors: [
      { name: 'Emerald Green', hex: '#047857' },
      { name: 'Maroon', hex: '#7F1D1D' },
      { name: 'Navy Blue', hex: '#1E3A5F' },
    ],
    sizes: ['M', 'L', 'XL', 'XXL'],
    fabric: 'Premium Georgette',
    fabricDetails: 'Flowing georgette with beautiful drape and movement',
    description: 'Elegant umbrella-cut abaya with delicate lace detailing. The flared silhouette offers a graceful, flowing look perfect for special occasions.',
    features: [
      'Umbrella cut for elegant flow',
      'Lace detail on sleeves and hem',
      'Hidden front zipper',
      'Matching hijab included',
      'Fully lined',
    ],
    careInstructions: ['Hand wash recommended', 'Iron on low', 'Dry in shade'],
    occasion: ['party', 'wedding', 'special-occasion'],
    style: 'lace-detail',
    includedItems: ['Abaya', 'Matching Hijab'],
    inStock: true,
    stockQuantity: 32,
    lowStockThreshold: 10,
    rating: 4.8,
    reviewCount: 89,
    tags: ['premium', 'party-wear'],
    createdAt: '2025-10-15T10:00:00Z',
    updatedAt: '2025-11-10T12:00:00Z',
  },
  // BURKHAS
  {
    id: 'burkha-001',
    sku: 'NMW-BK-001',
    name: 'Classic Burkha with Built-in Niqab',
    slug: 'classic-burkha-built-in-niqab',
    category: 'burkhas',
    subcategory: 'full-coverage',
    brand: 'Noor Modest Wear',
    price: 1999,
    salePrice: null,
    discountPercentage: 0,
    currency: 'INR',
    images: [
      getModestFashionImage('burkhas', '1'),
      getModestFashionImage('burkhas', '2'),
    ],
    thumbnail: getModestFashionImage('burkhas', '1', 400, 500),
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Brown', hex: '#78350F' },
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    fabric: 'Nida',
    fabricDetails: 'Soft nida fabric with excellent coverage',
    description: 'Traditional burkha with built-in niqab for complete coverage. Comfortable for all-day wear with breathable fabric.',
    features: [
      'Built-in niqab with elastic band',
      'Full-length coverage',
      'Side pockets',
      'Elasticated sleeves',
      'Easy care fabric',
    ],
    careInstructions: ['Machine wash cold', 'Do not bleach', 'Hang to dry'],
    occasion: ['daily-wear', 'prayer'],
    style: 'plain',
    includedItems: ['Burkha with built-in niqab'],
    inStock: true,
    stockQuantity: 67,
    lowStockThreshold: 15,
    rating: 4.5,
    reviewCount: 145,
    tags: ['bestseller'],
    createdAt: '2025-09-20T10:00:00Z',
    updatedAt: '2025-11-12T15:30:00Z',
  },
  // HIJABS
  {
    id: 'hijab-001',
    sku: 'NMW-HJ-CHF-001',
    name: 'Premium Chiffon Hijab',
    slug: 'premium-chiffon-hijab',
    category: 'hijabs',
    subcategory: 'chiffon',
    brand: 'Noor Modest Wear',
    price: 399,
    salePrice: 349,
    discountPercentage: 13,
    currency: 'INR',
    images: [
      getModestFashionImage('hijabs', '1'),
      getModestFashionImage('hijabs', '2'),
    ],
    thumbnail: getModestFashionImage('hijabs', '1', 400, 500),
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'White', hex: '#FFFFFF' },
      { name: 'Maroon', hex: '#7F1D1D' },
      { name: 'Emerald', hex: '#047857' },
      { name: 'Dusty Pink', hex: '#E5B8A9' },
    ],
    sizes: ['180cm x 70cm'],
    fabric: 'Premium Chiffon',
    fabricDetails: 'Soft, lightweight chiffon that drapes beautifully',
    description: 'Versatile chiffon hijab perfect for everyday wear and special occasions. Light, breathable, and easy to style.',
    features: [
      'Lightweight and breathable',
      'Semi-transparent (layer for opacity)',
      'Easy to style',
      'No ironing needed',
      'Stays in place all day',
    ],
    careInstructions: ['Hand wash cold', 'Air dry', 'No ironing needed'],
    occasion: ['daily-wear', 'formal', 'party'],
    style: 'plain',
    includedItems: ['Hijab'],
    inStock: true,
    stockQuantity: 250,
    lowStockThreshold: 30,
    rating: 4.8,
    reviewCount: 342,
    tags: ['bestseller', 'popular'],
    createdAt: '2025-09-01T10:00:00Z',
    updatedAt: '2025-11-16T11:00:00Z',
  },
  {
    id: 'hijab-002',
    sku: 'NMW-HJ-JER-001',
    name: 'Jersey Instant Hijab',
    slug: 'jersey-instant-hijab',
    category: 'hijabs',
    subcategory: 'instant',
    brand: 'Noor Modest Wear',
    price: 599,
    salePrice: null,
    discountPercentage: 0,
    currency: 'INR',
    images: [
      getModestFashionImage('hijabs', '3'),
      getModestFashionImage('hijabs', '4'),
    ],
    thumbnail: getModestFashionImage('hijabs', '3', 400, 500),
    colors: [
      { name: 'Black', hex: '#000000' },
      { name: 'Navy', hex: '#1E3A5F' },
      { name: 'Grey', hex: '#6B7280' },
      { name: 'Beige', hex: '#D4B59E' },
    ],
    sizes: ['One Size'],
    fabric: 'Premium Jersey',
    fabricDetails: 'Stretchable jersey fabric for perfect fit',
    description: 'Ready-to-wear instant hijab in soft jersey fabric. Perfect for busy mornings and active lifestyles.',
    features: [
      'Slip-on style',
      'No pins needed',
      'Stretchable for perfect fit',
      'Full coverage',
      'Machine washable',
    ],
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Iron if needed'],
    occasion: ['daily-wear', 'casual', 'sports'],
    style: 'instant',
    includedItems: ['Instant Hijab'],
    inStock: true,
    stockQuantity: 180,
    lowStockThreshold: 25,
    rating: 4.7,
    reviewCount: 203,
    tags: ['new-arrival', 'convenience'],
    createdAt: '2025-10-20T10:00:00Z',
    updatedAt: '2025-11-14T14:00:00Z',
  },
  // MAXI DRESSES
  {
    id: 'dress-001',
    sku: 'NMW-DR-MX-001',
    name: 'Elegant Modest Maxi Dress',
    slug: 'elegant-modest-maxi-dress',
    category: 'maxi-dresses',
    subcategory: 'casual',
    brand: 'Noor Modest Wear',
    price: 2199,
    salePrice: 1899,
    discountPercentage: 14,
    currency: 'INR',
    images: [
      getModestFashionImage('maxi-dresses', '1'),
      getModestFashionImage('maxi-dresses', '2'),
    ],
    thumbnail: getModestFashionImage('maxi-dresses', '1', 400, 500),
    colors: [
      { name: 'Emerald', hex: '#047857' },
      { name: 'Burgundy', hex: '#7F1D1D' },
      { name: 'Navy', hex: '#1E3A5F' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    fabric: 'Cotton Blend',
    fabricDetails: '70% Cotton, 30% Polyester for comfort and durability',
    description: 'Flowing maxi dress with modest silhouette. Perfect for casual outings and semi-formal occasions.',
    features: [
      'Full-length coverage',
      'Long sleeves',
      'Side pockets',
      'Comfortable fit',
      'Machine washable',
    ],
    careInstructions: ['Machine wash cold', 'Tumble dry low', 'Iron medium heat'],
    occasion: ['casual', 'daily-wear', 'semi-formal'],
    style: 'plain',
    includedItems: ['Maxi Dress'],
    inStock: true,
    stockQuantity: 55,
    lowStockThreshold: 12,
    rating: 4.6,
    reviewCount: 87,
    tags: ['comfortable', 'versatile'],
    createdAt: '2025-10-05T10:00:00Z',
    updatedAt: '2025-11-11T13:00:00Z',
  },
];

// Generate more products programmatically to reach 100+ products
const generateAdditionalProducts = (): Product[] => {
  const additionalProducts: Product[] = [];
  const categories = ['abayas', 'burkhas', 'hijabs', 'maxi-dresses'];
  const colors = [
    { name: 'Black', hex: '#000000' },
    { name: 'Navy', hex: '#1E3A5F' },
    { name: 'Emerald', hex: '#047857' },
    { name: 'Burgundy', hex: '#7F1D1D' },
    { name: 'Grey', hex: '#6B7280' },
    { name: 'Beige', hex: '#D4B59E' },
  ];

  for (let i = 0; i < 95; i++) {
    const category = categories[i % categories.length];
    const isOnSale = i % 3 === 0;
    const price = 1000 + Math.floor(Math.random() * 3000);
    const salePrice = isOnSale ? Math.floor(price * 0.85) : null;
    const variantNumber = String(i + 10);

    additionalProducts.push({
      id: `${category}-${String(i + 10).padStart(3, '0')}`,
      sku: `NMW-${category.substring(0, 2).toUpperCase()}-${String(i + 10).padStart(3, '0')}`,
      name: `${category.charAt(0).toUpperCase() + category.slice(1, -1)} Style ${i + 1}`,
      slug: `${category}-style-${i + 1}`,
      category,
      subcategory: category === 'abayas' ? ['front-open', 'umbrella', 'butterfly'][i % 3] : 'standard',
      brand: 'Noor Modest Wear',
      price,
      salePrice,
      discountPercentage: isOnSale ? 15 : 0,
      currency: 'INR',
      images: [
        getModestFashionImage(category, variantNumber),
        getModestFashionImage(category, String(i + 11)),
      ],
      thumbnail: getModestFashionImage(category, variantNumber, 400, 500),
      colors: colors.slice(0, 3 + (i % 3)),
      sizes: ['S', 'M', 'L', 'XL'],
      fabric: ['Nida', 'Georgette', 'Chiffon', 'Jersey', 'Cotton'][i % 5],
      fabricDetails: 'High-quality fabric with excellent drape and comfort',
      description: `Beautiful ${category} perfect for various occasions. Made with premium materials for lasting quality.`,
      features: [
        'Premium quality',
        'Comfortable fit',
        'Easy care',
        'Modest coverage',
      ],
      careInstructions: ['Machine wash cold', 'Dry in shade', 'Iron on low'],
      occasion: ['daily-wear', 'formal', 'casual'][i % 3] ? ['daily-wear'] : ['formal'],
      style: ['plain', 'embroidered', 'printed'][i % 3],
      includedItems: [category.charAt(0).toUpperCase() + category.slice(1, -1)],
      inStock: i % 15 !== 0,
      stockQuantity: i % 15 === 0 ? 0 : 20 + Math.floor(Math.random() * 100),
      lowStockThreshold: 10,
      rating: 4.0 + Math.random() * 1.0,
      reviewCount: Math.floor(Math.random() * 300),
      tags: isOnSale ? ['sale'] : i % 5 === 0 ? ['new-arrival'] : [],
      createdAt: new Date(2025, 8 + (i % 3), 1 + (i % 28)).toISOString(),
      updatedAt: new Date(2025, 10, 1 + (i % 19)).toISOString(),
    });
  }

  return additionalProducts;
};

export const allProducts = [...products, ...generateAdditionalProducts()];

// Helper functions for filtering
export const getProductsByCategory = (category: string) =>
  allProducts.filter((p) => p.category === category);

export const getProductById = (id: string) =>
  allProducts.find((p) => p.id === id);

export const getProductBySlug = (slug: string) =>
  allProducts.find((p) => p.slug === slug);

export const getFeaturedProducts = () =>
  allProducts.filter((p) => p.tags.includes('bestseller') || p.tags.includes('premium')).slice(0, 8);

export const getNewArrivals = () =>
  allProducts
    .filter((p) => p.tags.includes('new-arrival') || new Date(p.createdAt) > new Date(2025, 9, 1))
    .slice(0, 8);

export const getSaleProducts = () =>
  allProducts.filter((p) => p.salePrice !== null && p.salePrice > 0);
