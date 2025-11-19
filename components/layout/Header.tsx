'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingBag, User, Menu, X, Phone } from 'lucide-react';
import { useCartStore, useWishlistStore } from '@/lib/store';

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const cartItemCount = useCartStore((state) => state.getItemCount());
  const wishlistCount = useWishlistStore((state) => state.items.length);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mainNavigation = [
    { name: 'New Arrivals', href: '/new-arrivals', highlight: true },
    { name: 'Burkhas & Abayas', href: '/category/abayas' },
    { name: 'Hijabs & Scarves', href: '/category/hijabs' },
    { name: 'Maxi Dresses', href: '/category/maxi-dresses' },
    { name: 'Collections', href: '/collections' },
    { name: 'Sale', href: '/sale', highlight: true },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md">
      {/* Top Bar */}
      <div className="bg-emerald text-white">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden md:block">
              <p className="font-script text-lg">Welcome to Noor Modest Wear</p>
            </div>
            <div className="flex items-center gap-6">
              <a href="tel:+919876543210" className="flex items-center gap-2 hover:text-gold transition-colors">
                <Phone className="w-4 h-4" />
                <span className="hidden sm:inline">+91 98765 43210</span>
              </a>
              <Link href="/track-order" className="hover:text-gold transition-colors">
                Track Order
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between py-4">
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-charcoal hover:text-emerald transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <h1 className="font-display text-2xl md:text-3xl font-bold text-emerald">
                Noor <span className="text-gold">Modest Wear</span>
              </h1>
            </Link>

            {/* Desktop Search Bar */}
            <div className="hidden lg:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search for abayas, hijabs..."
                  className="w-full px-4 py-2.5 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-emerald focus:ring-2 focus:ring-gold focus:ring-offset-2 transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              {/* Mobile Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="lg:hidden p-2 text-charcoal hover:text-emerald transition-colors"
                aria-label="Search"
              >
                <Search className="w-6 h-6" />
              </button>

              {/* Account */}
              <Link
                href="/account"
                className="hidden sm:flex p-2 text-charcoal hover:text-emerald transition-colors"
                aria-label="Account"
              >
                <User className="w-6 h-6" />
              </Link>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-charcoal hover:text-emerald transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-6 h-6" />
                {mounted && wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-charcoal hover:text-emerald transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingBag className="w-6 h-6" />
                {mounted && cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gold text-charcoal text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isSearchOpen && (
            <div className="lg:hidden pb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for abayas, hijabs..."
                  className="w-full px-4 py-2.5 pl-10 pr-4 rounded-lg border border-gray-300 focus:border-emerald focus:ring-2 focus:ring-gold transition-all"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden lg:block border-b border-gray-200">
        <div className="container-custom mx-auto">
          <ul className="flex items-center justify-center gap-8 py-4">
            {mainNavigation.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`font-semibold transition-all duration-200 hover:text-emerald relative group ${
                    item.highlight ? 'text-gold' : 'text-charcoal'
                  }`}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold transition-all duration-200 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[136px] bg-white z-50 overflow-y-auto">
          <nav className="container-custom mx-auto py-6">
            <ul className="space-y-4">
              {mainNavigation.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block px-4 py-3 font-semibold rounded-lg transition-colors ${
                      item.highlight
                        ? 'text-gold bg-gold/10'
                        : 'text-charcoal hover:bg-emerald/10 hover:text-emerald'
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-200">
                <Link
                  href="/account"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-4 py-3 font-semibold text-charcoal hover:bg-emerald/10 hover:text-emerald rounded-lg transition-colors"
                >
                  My Account
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}

      {/* Free Shipping Banner */}
      <div className="bg-gold/10 border-b border-gold/20">
        <div className="container-custom mx-auto">
          <p className="text-center py-2 text-sm font-semibold text-charcoal">
            <span className="text-gold">✨ Free Shipping</span> on orders above ₹999
          </p>
        </div>
      </div>
    </header>
  );
}
