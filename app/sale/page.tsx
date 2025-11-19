'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { getSaleProducts } from '@/data/products';
import { ChevronDown, Tag } from 'lucide-react';

export default function SalePage() {
  const [sortBy, setSortBy] = useState('discount-high');

  let saleProducts = getSaleProducts();

  // Sort products
  if (sortBy === 'discount-high') {
    saleProducts.sort((a, b) => b.discountPercentage - a.discountPercentage);
  } else if (sortBy === 'price-low') {
    saleProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortBy === 'price-high') {
    saleProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container-custom mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Tag className="w-8 h-8 text-burgundy" />
            <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
              Sale - Up to 50% Off
            </h1>
          </div>
          <p className="text-gray-600 mb-6">
            Limited time offers on our premium modest fashion collection
          </p>

          {/* Sort Controls */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {saleProducts.length} products on sale
            </p>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:border-emerald focus:ring-2 focus:ring-emerald cursor-pointer"
              >
                <option value="discount-high">Highest Discount</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Sale Banner */}
        <div className="bg-gradient-to-r from-burgundy to-burgundy-dark text-white rounded-xl p-8 mb-8 text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            🎉 Seasonal Sale
          </h2>
          <p className="text-lg">
            Don&apos;t miss out on these amazing deals - Limited stock available!
          </p>
        </div>

        {/* Products Grid */}
        {saleProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {saleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600">No sale items available at the moment</p>
            <p className="text-gray-500 mt-2">Check back soon for amazing deals!</p>
          </div>
        )}
      </div>
    </div>
  );
}
