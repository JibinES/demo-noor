'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { formatPrice } from '@/lib/utils';
import { useWishlistStore, useCartStore } from '@/lib/store';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addItem: addToCart } = useCartStore();

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.salePrice && product.salePrice > 0;
  const displayPrice = hasDiscount ? product.salePrice : product.price;

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart with first available color and size
    if (product.inStock && product.colors.length > 0 && product.sizes.length > 0) {
      addToCart(product, product.colors[0], product.sizes[0], 1);
    }
  };

  return (
    <Link href={`/products/${product.slug}`}>
      <div
        className="card card-hover group relative bg-white rounded-xl overflow-hidden cursor-pointer"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative aspect-[3/4] overflow-hidden bg-cream-dark">
          <Image
            src={product.thumbnail}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {!product.inStock && <Badge variant="out-of-stock">Out of Stock</Badge>}
            {product.tags.includes('new-arrival') && <Badge variant="new">New</Badge>}
            {product.tags.includes('bestseller') && <Badge variant="bestseller">Bestseller</Badge>}
            {hasDiscount && (
              <Badge variant="sale">-{product.discountPercentage}%</Badge>
            )}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={handleWishlistToggle}
            className={`absolute top-3 right-3 z-10 p-2 rounded-full transition-all duration-200 ${
              inWishlist
                ? 'bg-gold text-white'
                : 'bg-white/90 text-charcoal hover:bg-gold hover:text-white'
            }`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart
              className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`}
            />
          </button>

          {/* Hover Overlay with Actions */}
          {isHovered && product.inStock && (
            <div className="absolute inset-0 bg-emerald/80 flex flex-col items-center justify-center gap-2 p-4 transition-all duration-300">
              <button
                onClick={handleQuickAdd}
                className="w-full max-w-[140px] bg-white text-emerald px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gold hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                Quick Add
              </button>
              <Link
                href={`/products/${product.slug}`}
                className="w-full max-w-[140px] bg-white text-emerald px-4 py-2 rounded-lg font-semibold text-sm hover:bg-gold hover:text-white transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Quick View
              </Link>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <p className="text-xs uppercase text-gray-500 tracking-wider mb-1">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="font-display text-base font-semibold text-charcoal mb-2 line-clamp-2 group-hover:text-emerald transition-colors">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-2">
            <div className="star-rating flex items-center">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating) ? 'text-gold fill-current' : 'text-gray-300'
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ))}
            </div>
            <span className="text-xs text-gray-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-lg font-bold text-emerald">
              {formatPrice(displayPrice!)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Color Options */}
          {product.colors.length > 0 && (
            <div className="flex items-center gap-2">
              {product.colors.slice(0, 4).map((color) => (
                <div
                  key={color.name}
                  className="w-6 h-6 rounded-full border-2 border-gray-200 cursor-pointer hover:border-emerald transition-colors"
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
              {product.colors.length > 4 && (
                <span className="text-xs text-gray-500">+{product.colors.length - 4}</span>
              )}
            </div>
          )}

          {/* Low Stock Warning */}
          {product.inStock && product.stockQuantity <= product.lowStockThreshold && (
            <p className="text-xs text-warning mt-2">Only {product.stockQuantity} left!</p>
          )}
        </div>
      </div>
    </Link>
  );
}
