'use client';

import React, { useState } from 'react';
import { ProductCard } from '@/components/products/ProductCard';
import { allProducts } from '@/data/products';
import { ChevronDown } from 'lucide-react';

export default function NewArrivalsPage() {
  const [sortBy, setSortBy] = useState('newest');

  // Filter products from last 2 months
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

  let newProducts = allProducts.filter(
    (p) => new Date(p.createdAt) >= twoMonthsAgo || p.tags.includes('new-arrival')
  );

  // Sort products
  if (sortBy === 'price-low') {
    newProducts.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
  } else if (sortBy === 'price-high') {
    newProducts.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
  } else {
    newProducts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container-custom mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
            New Arrivals
          </h1>
          <p className="text-gray-600 mb-6">
            Discover our latest collection of modest fashion
          </p>

          {/* Sort Controls */}
          <div className="flex items-center justify-between">
            <p className="text-gray-600">
              Showing {newProducts.length} products
            </p>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:border-emerald focus:ring-2 focus:ring-emerald cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
