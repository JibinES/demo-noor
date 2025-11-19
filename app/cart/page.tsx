'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, Heart, ShoppingBag, ArrowRight, Truck } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore();
  const { addItem: addToWishlist } = useWishlistStore();
  const [couponCode, setCouponCode] = useState('');

  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const total = subtotal + shipping + tax;
  const savings = items.reduce((acc, item) => {
    if (item.product.salePrice) {
      return acc + (item.product.price - item.product.salePrice) * item.quantity;
    }
    return acc;
  }, 0);

  const handleQuantityChange = (itemIndex: number, newQuantity: number) => {
    const item = items[itemIndex];
    if (newQuantity <= 0) {
      removeItem(item.product.id, item.selectedColor.name, item.selectedSize);
    } else {
      updateQuantity(item.product.id, item.selectedColor.name, item.selectedSize, newQuantity);
    }
  };

  const handleRemove = (itemIndex: number) => {
    const item = items[itemIndex];
    removeItem(item.product.id, item.selectedColor.name, item.selectedSize);
  };

  const handleMoveToWishlist = (itemIndex: number) => {
    const item = items[itemIndex];
    addToWishlist(item.product.id);
    removeItem(item.product.id, item.selectedColor.name, item.selectedSize);
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center py-16">
        <div className="text-center">
          <div className="w-32 h-32 mx-auto mb-6 bg-cream-dark rounded-full flex items-center justify-center">
            <ShoppingBag className="w-16 h-16 text-gray-400" />
          </div>
          <h1 className="font-display text-3xl font-bold text-charcoal mb-4">
            Your Cart is Empty
          </h1>
          <p className="text-gray-600 mb-8">
            Start adding items you love to your cart
          </p>
          <Link href="/">
            <Button size="lg">
              Continue Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container-custom mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-8">
          Shopping Cart ({getItemCount()} {getItemCount() === 1 ? 'Item' : 'Items'})
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => {
              const itemPrice = item.product.salePrice || item.product.price;
              const itemTotal = itemPrice * item.quantity;

              return (
                <div key={`${item.product.id}-${item.selectedColor.name}-${item.selectedSize}`} className="card bg-white p-6">
                  <div className="flex gap-6">
                    {/* Product Image */}
                    <Link href={`/products/${item.product.slug}`} className="relative w-32 h-40 flex-shrink-0 rounded-lg overflow-hidden">
                      <Image
                        src={item.product.thumbnail}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1">
                      <div className="flex justify-between gap-4 mb-2">
                        <Link href={`/products/${item.product.slug}`}>
                          <h3 className="font-semibold text-charcoal hover:text-emerald transition-colors">
                            {item.product.name}
                          </h3>
                        </Link>
                        <button
                          onClick={() => handleRemove(index)}
                          className="text-gray-400 hover:text-error transition-colors"
                          aria-label="Remove item"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <p className="text-sm text-gray-600 mb-3">
                        Color: {item.selectedColor.name} • Size: {item.selectedSize}
                      </p>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-lg font-bold text-emerald">
                          {formatPrice(itemPrice)}
                        </span>
                        {item.product.salePrice && (
                          <span className="text-sm text-gray-500 line-through">
                            {formatPrice(item.product.price)}
                          </span>
                        )}
                      </div>

                      {/* Quantity & Actions */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-cream-dark hover:bg-emerald hover:text-white transition-colors flex items-center justify-center"
                          >
                            -
                          </button>
                          <span className="w-12 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => handleQuantityChange(index, item.quantity + 1)}
                            disabled={item.quantity >= 5}
                            className="w-8 h-8 rounded-lg bg-cream-dark hover:bg-emerald hover:text-white transition-colors flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            +
                          </button>
                        </div>

                        <div className="flex items-center gap-4">
                          <button
                            onClick={() => handleMoveToWishlist(index)}
                            className="text-sm text-emerald hover:underline flex items-center gap-1"
                          >
                            <Heart className="w-4 h-4" />
                            Move to Wishlist
                          </button>
                          <span className="text-lg font-bold text-charcoal">
                            {formatPrice(itemTotal)}
                          </span>
                        </div>
                      </div>

                      {/* Low Stock Warning */}
                      {item.product.stockQuantity <= item.product.lowStockThreshold && (
                        <p className="text-sm text-warning mt-2">
                          Only {item.product.stockQuantity} left in stock!
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Continue Shopping */}
            <Link href="/" className="inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all">
              <ArrowRight className="w-5 h-5 rotate-180" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-white p-6 sticky top-24">
              <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                Order Summary
              </h2>

              {/* Coupon Code */}
              <div className="mb-6 pb-6 border-b border-gray-200">
                <label className="block text-sm font-semibold text-charcoal mb-2">
                  Have a coupon code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:border-emerald focus:ring-2 focus:ring-emerald"
                  />
                  <Button variant="secondary" size="md">
                    Apply
                  </Button>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? (
                      <span className="text-success">FREE</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax (GST 18%)</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>

                {savings > 0 && (
                  <div className="flex justify-between text-success">
                    <span>You're Saving</span>
                    <span className="font-semibold">-{formatPrice(savings)}</span>
                  </div>
                )}
              </div>

              <div className="pt-6 border-t border-gray-200 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-charcoal">Total</span>
                  <span className="text-2xl font-bold text-emerald">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>

              {/* Shipping Threshold */}
              {subtotal < 999 && (
                <div className="bg-gold/10 border border-gold/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Truck className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-semibold text-charcoal">
                        Add {formatPrice(999 - subtotal)} more for FREE shipping!
                      </p>
                      <div className="w-full h-2 bg-gray-200 rounded-full mt-2 overflow-hidden">
                        <div
                          className="h-full bg-gold transition-all"
                          style={{ width: `${(subtotal / 999) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <Link href="/checkout">
                <Button size="lg" className="w-full mb-3">
                  Proceed to Checkout
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>

              <p className="text-xs text-center text-gray-500">
                Taxes and shipping calculated at checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
