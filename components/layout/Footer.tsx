'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Youtube, Mail, Shield, Truck, RotateCcw, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setSubscribed(true);
    setTimeout(() => setSubscribed(false), 3000);
  };

  const footerLinks = {
    shop: [
      { name: 'New Arrivals', href: '/new-arrivals' },
      { name: 'Burkhas & Abayas', href: '/category/abayas' },
      { name: 'Hijabs & Scarves', href: '/category/hijabs' },
      { name: 'Maxi Dresses', href: '/category/maxi-dresses' },
      { name: 'Sale', href: '/sale' },
    ],
    information: [
      { name: 'About Us', href: '/about' },
      { name: 'Sizing Guide', href: '/size-guide' },
      { name: 'Styling Tips', href: '/blog' },
      { name: 'Fabric Care', href: '/fabric-care' },
      { name: 'Modest Fashion Guide', href: '/blog/modest-fashion' },
    ],
    customerService: [
      { name: 'Contact Us', href: '/contact' },
      { name: 'Track Order', href: '/track-order' },
      { name: 'Shipping Policy', href: '/shipping-policy' },
      { name: 'Return & Exchange', href: '/returns' },
      { name: 'FAQs', href: '/faq' },
    ],
    account: [
      { name: 'Login / Sign Up', href: '/login' },
      { name: 'My Orders', href: '/account/orders' },
      { name: 'My Wishlist', href: '/wishlist' },
      { name: 'Account Settings', href: '/account' },
    ],
  };

  return (
    <footer className="bg-cream-dark islamic-pattern">
      {/* Newsletter Section */}
      <div className="border-b border-gold/20">
        <div className="container-custom mx-auto py-12">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-charcoal mb-3">
              Join Our Modest Fashion Family
            </h3>
            <p className="text-gray-600 mb-6">
              Get exclusive offers, styling tips, and early access to new collections
            </p>

            {subscribed ? (
              <div className="bg-success text-white px-6 py-3 rounded-lg inline-flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 px-4 py-3 rounded-lg border-2 border-gold/30 focus:border-gold focus:ring-2 focus:ring-gold/20 transition-all"
                />
                <Button type="submit" variant="gold" size="md">
                  Subscribe
                </Button>
              </form>
            )}
            <p className="text-sm text-gray-500 mt-3">
              Get 10% off your first order!
            </p>
          </div>

          {/* Social Media */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-emerald hover:text-white transition-all duration-200"
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-emerald hover:text-white transition-all duration-200"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-charcoal hover:bg-emerald hover:text-white transition-all duration-200"
              aria-label="YouTube"
            >
              <Youtube className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="border-b border-gold/20">
        <div className="container-custom mx-auto py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Shop Column */}
            <div>
              <h4 className="font-display text-lg font-bold text-charcoal mb-4">Shop</h4>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-emerald transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Information Column */}
            <div>
              <h4 className="font-display text-lg font-bold text-charcoal mb-4">Information</h4>
              <ul className="space-y-3">
                {footerLinks.information.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-emerald transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Service Column */}
            <div>
              <h4 className="font-display text-lg font-bold text-charcoal mb-4">Customer Service</h4>
              <ul className="space-y-3">
                {footerLinks.customerService.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-emerald transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* My Account Column */}
            <div>
              <h4 className="font-display text-lg font-bold text-charcoal mb-4">My Account</h4>
              <ul className="space-y-3">
                {footerLinks.account.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-emerald transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="border-b border-gold/20">
        <div className="container-custom mx-auto py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Shield className="w-6 h-6 text-gold" />
              </div>
              <h5 className="font-semibold text-charcoal text-sm mb-1">100% Authentic</h5>
              <p className="text-xs text-gray-500">Quality Guaranteed</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Truck className="w-6 h-6 text-gold" />
              </div>
              <h5 className="font-semibold text-charcoal text-sm mb-1">Free Shipping</h5>
              <p className="text-xs text-gray-500">Above ₹999</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <RotateCcw className="w-6 h-6 text-gold" />
              </div>
              <h5 className="font-semibold text-charcoal text-sm mb-1">Easy Returns</h5>
              <p className="text-xs text-gray-500">7 Days Return Policy</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <CreditCard className="w-6 h-6 text-gold" />
              </div>
              <h5 className="font-semibold text-charcoal text-sm mb-1">Secure Payment</h5>
              <p className="text-xs text-gray-500">100% Safe & Secure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-charcoal text-white">
        <div className="container-custom mx-auto py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2025 Noor Modest Wear. All Rights Reserved.
            </p>

            <div className="flex items-center gap-4 text-sm">
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors">
                Terms & Conditions
              </Link>
              <span className="text-gray-600">|</span>
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
            </div>

            <p className="text-sm text-gray-400 text-center md:text-right font-script">
              Made with ♥ for the Modest Community
            </p>
          </div>

          {/* Payment Methods */}
          <div className="mt-4 pt-4 border-t border-gray-700">
            <p className="text-xs text-gray-500 text-center mb-2">We Accept</p>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              {['Visa', 'Mastercard', 'RuPay', 'UPI', 'Paytm'].map((method) => (
                <div key={method} className="px-3 py-1 bg-white rounded text-xs font-semibold text-charcoal">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
