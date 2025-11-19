'use client';

import React from 'react';
import Link from 'next/link';
import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { useWishlistStore } from '@/lib/store';
import { getProductById } from '@/data/products';

export default function WishlistPage() {
  const { items, clearWishlist } = useWishlistStore();

  const wishlistProducts = items.map(id => getProductById(id)).filter(Boolean);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-cream-dark rounded-full flex items-center justify-center">
            <Heart className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
            Your Wishlist is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Save items you love for later
          </p>
          <Link href="/">
            <Button size="lg">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
            My Wishlist ({items.length} {items.length === 1 ? 'Item' : 'Items'})
          </h1>
          {items.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-emerald hover:text-emerald-dark font-semibold transition-colors"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistProducts.map((product) => product && (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
