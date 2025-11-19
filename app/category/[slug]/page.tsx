'use client';

import React, { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Filter, X, ChevronDown } from 'lucide-react';
import { ProductCard } from '@/components/products/ProductCard';
import { allProducts } from '@/data/products';
import { Product } from '@/lib/types';

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedFabrics, setSelectedFabrics] = useState<string[]>([]);

  // Get category name from slug
  const categoryName = slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  // Filter products by category
  const categoryProducts = allProducts.filter(p => p.category === slug);

  // Apply filters
  const filteredProducts = useMemo(() => {
    let filtered = [...categoryProducts];

    // Price filter
    filtered = filtered.filter(p => {
      const price = p.salePrice || p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

    // Size filter
    if (selectedSizes.length > 0) {
      filtered = filtered.filter(p =>
        p.sizes.some(size => selectedSizes.includes(size))
      );
    }

    // Color filter
    if (selectedColors.length > 0) {
      filtered = filtered.filter(p =>
        p.colors.some(color => selectedColors.includes(color.name))
      );
    }

    // Fabric filter
    if (selectedFabrics.length > 0) {
      filtered = filtered.filter(p => selectedFabrics.includes(p.fabric));
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => (a.salePrice || a.price) - (b.salePrice || b.price));
        break;
      case 'price-high':
        filtered.sort((a, b) => (b.salePrice || b.price) - (a.salePrice || a.price));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // Featured - keep original order
        break;
    }

    return filtered;
  }, [categoryProducts, priceRange, selectedSizes, selectedColors, selectedFabrics, sortBy]);

  // Get unique values for filters
  const availableSizes = useMemo(() => {
    const sizes = new Set<string>();
    categoryProducts.forEach(p => p.sizes.forEach(s => sizes.add(s)));
    return Array.from(sizes);
  }, [categoryProducts]);

  const availableColors = useMemo(() => {
    const colors = new Set<string>();
    categoryProducts.forEach(p => p.colors.forEach(c => colors.add(c.name)));
    return Array.from(colors);
  }, [categoryProducts]);

  const availableFabrics = useMemo(() => {
    const fabrics = new Set<string>();
    categoryProducts.forEach(p => fabrics.add(p.fabric));
    return Array.from(fabrics);
  }, [categoryProducts]);

  const toggleSize = (size: string) => {
    setSelectedSizes(prev =>
      prev.includes(size) ? prev.filter(s => s !== size) : [...prev, size]
    );
  };

  const toggleColor = (color: string) => {
    setSelectedColors(prev =>
      prev.includes(color) ? prev.filter(c => c !== color) : [...prev, color]
    );
  };

  const toggleFabric = (fabric: string) => {
    setSelectedFabrics(prev =>
      prev.includes(fabric) ? prev.filter(f => f !== fabric) : [...prev, fabric]
    );
  };

  const clearAllFilters = () => {
    setPriceRange([0, 10000]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedFabrics([]);
  };

  const activeFilterCount = selectedSizes.length + selectedColors.length + selectedFabrics.length;

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-custom mx-auto py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><a href="/" className="hover:text-emerald">Home</a></li>
            <li>/</li>
            <li className="text-charcoal font-semibold">{categoryName}</li>
          </ol>
        </nav>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
            {categoryName}
          </h1>
          <p className="text-gray-600">
            Showing {filteredProducts.length} of {categoryProducts.length} products
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <div className="bg-white rounded-xl shadow-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-display text-xl font-bold text-charcoal">Filters</h2>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearAllFilters}
                      className="text-sm text-emerald hover:text-emerald-dark"
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* Price Range */}
                <div className="mb-6 pb-6 border-b border-gray-200">
                  <h3 className="font-semibold text-charcoal mb-4">Price Range</h3>
                  <div className="space-y-4">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={priceRange[1]}
                      onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                      className="w-full accent-emerald"
                    />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">₹{priceRange[0]}</span>
                      <span className="text-gray-600">₹{priceRange[1]}</span>
                    </div>
                  </div>
                </div>

                {/* Size Filter */}
                {availableSizes.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-semibold text-charcoal mb-4">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedSizes.includes(size)
                              ? 'bg-emerald border-emerald text-white'
                              : 'bg-white border-gray-300 text-charcoal hover:border-emerald'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Color Filter */}
                {availableColors.length > 0 && (
                  <div className="mb-6 pb-6 border-b border-gray-200">
                    <h3 className="font-semibold text-charcoal mb-4">Color</h3>
                    <div className="space-y-2">
                      {availableColors.map((color) => (
                        <label key={color} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleColor(color)}
                            className="w-5 h-5 rounded border-gray-300 text-emerald focus:ring-emerald"
                          />
                          <span className="text-sm text-charcoal">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fabric Filter */}
                {availableFabrics.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-semibold text-charcoal mb-4">Fabric</h3>
                    <div className="space-y-2">
                      {availableFabrics.map((fabric) => (
                        <label key={fabric} className="flex items-center gap-3 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedFabrics.includes(fabric)}
                            onChange={() => toggleFabric(fabric)}
                            className="w-5 h-5 rounded border-gray-300 text-emerald focus:ring-emerald"
                          />
                          <span className="text-sm text-charcoal">{fabric}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Mobile Filter Button & Sort */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setIsFilterOpen(true)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-card"
              >
                <Filter className="w-5 h-5" />
                Filters
                {activeFilterCount > 0 && (
                  <span className="bg-emerald text-white text-xs px-2 py-0.5 rounded-full">
                    {activeFilterCount}
                  </span>
                )}
              </button>

              {/* Sort Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white px-4 py-2 pr-10 rounded-lg border border-gray-300 focus:border-emerald focus:ring-2 focus:ring-emerald cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Active Filters Pills */}
            {activeFilterCount > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {selectedSizes.map(size => (
                  <button
                    key={size}
                    onClick={() => toggleSize(size)}
                    className="flex items-center gap-2 bg-emerald text-white px-3 py-1 rounded-full text-sm"
                  >
                    Size: {size}
                    <X className="w-4 h-4" />
                  </button>
                ))}
                {selectedColors.map(color => (
                  <button
                    key={color}
                    onClick={() => toggleColor(color)}
                    className="flex items-center gap-2 bg-emerald text-white px-3 py-1 rounded-full text-sm"
                  >
                    {color}
                    <X className="w-4 h-4" />
                  </button>
                ))}
                {selectedFabrics.map(fabric => (
                  <button
                    key={fabric}
                    onClick={() => toggleFabric(fabric)}
                    className="flex items-center gap-2 bg-emerald text-white px-3 py-1 rounded-full text-sm"
                  >
                    {fabric}
                    <X className="w-4 h-4" />
                  </button>
                ))}
              </div>
            )}

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-gray-600 mb-4">No products found</p>
                <button
                  onClick={clearAllFilters}
                  className="text-emerald font-semibold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-black/50" onClick={() => setIsFilterOpen(false)}>
          <div
            className="absolute right-0 top-0 bottom-0 w-80 bg-white overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display text-xl font-bold">Filters</h2>
                <button onClick={() => setIsFilterOpen(false)}>
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Same filter content as desktop */}
              <div className="space-y-6">
                {/* Price Range */}
                <div className="pb-6 border-b">
                  <h3 className="font-semibold mb-4">Price Range</h3>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-emerald"
                  />
                  <div className="flex justify-between text-sm mt-2">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                {/* Sizes */}
                {availableSizes.length > 0 && (
                  <div className="pb-6 border-b">
                    <h3 className="font-semibold mb-4">Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {availableSizes.map((size) => (
                        <button
                          key={size}
                          onClick={() => toggleSize(size)}
                          className={`px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedSizes.includes(size)
                              ? 'bg-emerald border-emerald text-white'
                              : 'bg-white border-gray-300 hover:border-emerald'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Colors */}
                {availableColors.length > 0 && (
                  <div className="pb-6 border-b">
                    <h3 className="font-semibold mb-4">Color</h3>
                    <div className="space-y-2">
                      {availableColors.map((color) => (
                        <label key={color} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedColors.includes(color)}
                            onChange={() => toggleColor(color)}
                            className="w-5 h-5 rounded text-emerald"
                          />
                          <span className="text-sm">{color}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Fabrics */}
                {availableFabrics.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-4">Fabric</h3>
                    <div className="space-y-2">
                      {availableFabrics.map((fabric) => (
                        <label key={fabric} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={selectedFabrics.includes(fabric)}
                            onChange={() => toggleFabric(fabric)}
                            className="w-5 h-5 rounded text-emerald"
                          />
                          <span className="text-sm">{fabric}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 pt-6 border-t">
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="w-full bg-emerald text-white py-3 rounded-lg font-semibold"
                >
                  Apply Filters
                </button>
                {activeFilterCount > 0 && (
                  <button
                    onClick={() => {
                      clearAllFilters();
                      setIsFilterOpen(false);
                    }}
                    className="w-full mt-2 text-emerald font-semibold"
                  >
                    Clear All
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
