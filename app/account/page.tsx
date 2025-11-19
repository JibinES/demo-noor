'use client';

import React from 'react';
import Link from 'next/link';
import { User, Package, Heart, MapPin, Settings, LogOut } from 'lucide-react';

export default function AccountPage() {
  const menuItems = [
    { icon: User, label: 'My Profile', href: '/account/profile' },
    { icon: Package, label: 'My Orders', href: '/account/orders' },
    { icon: Heart, label: 'Wishlist', href: '/wishlist' },
    { icon: MapPin, label: 'Addresses', href: '/account/addresses' },
    { icon: Settings, label: 'Settings', href: '/account/settings' },
  ];

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container-custom mx-auto">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-8">
          My Account
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                href={item.href}
                className="card bg-white p-6 hover:shadow-card-hover transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-emerald/10 flex items-center justify-center group-hover:bg-emerald transition-colors">
                    <Icon className="w-6 h-6 text-emerald group-hover:text-white transition-colors" />
                  </div>
                  <span className="font-semibold text-charcoal group-hover:text-emerald transition-colors">
                    {item.label}
                  </span>
                </div>
              </Link>
            );
          })}

          {/* Logout */}
          <button className="card bg-white p-6 hover:shadow-card-hover transition-all group text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-error/10 flex items-center justify-center group-hover:bg-error transition-colors">
                <LogOut className="w-6 h-6 text-error group-hover:text-white transition-colors" />
              </div>
              <span className="font-semibold text-charcoal group-hover:text-error transition-colors">
                Logout
              </span>
            </div>
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="card bg-emerald text-white p-6">
            <p className="text-sm opacity-90 mb-2">Total Orders</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="card bg-gold text-charcoal p-6">
            <p className="text-sm opacity-90 mb-2">Wishlist Items</p>
            <p className="text-3xl font-bold">0</p>
          </div>
          <div className="card bg-burgundy text-white p-6">
            <p className="text-sm opacity-90 mb-2">Saved Addresses</p>
            <p className="text-3xl font-bold">0</p>
          </div>
        </div>
      </div>
    </div>
  );
}
