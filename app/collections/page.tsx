import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

export default function CollectionsPage() {
  const collections = [
    {
      name: 'Designer Collection',
      description: 'Premium designer pieces with intricate embroidery and luxury fabrics',
      image: 'https://picsum.photos/seed/collection-designer/800/1000',
      href: '/category/abayas?collection=designer',
      itemCount: 24,
      color: 'emerald',
    },
    {
      name: 'Everyday Essentials',
      description: 'Comfortable and practical designs for daily wear',
      image: 'https://picsum.photos/seed/collection-everyday/800/1000',
      href: '/category/abayas?collection=everyday',
      itemCount: 45,
      color: 'gold',
    },
    {
      name: 'Ramadan Special',
      description: 'Elegant pieces perfect for the holy month',
      image: 'https://picsum.photos/seed/collection-ramadan/800/1000',
      href: '/category/abayas?occasion=ramadan',
      itemCount: 32,
      color: 'burgundy',
    },
    {
      name: 'Wedding & Party',
      description: 'Stunning formal wear for special occasions',
      image: 'https://picsum.photos/seed/collection-wedding/800/1000',
      href: '/category/abayas?occasion=party',
      itemCount: 28,
      color: 'emerald',
    },
    {
      name: 'Summer Collection',
      description: 'Lightweight and breathable fabrics for warm weather',
      image: 'https://picsum.photos/seed/collection-summer/800/1000',
      href: '/category/burkhas?season=summer',
      itemCount: 38,
      color: 'gold',
    },
    {
      name: 'Hijab Essentials',
      description: 'Complete range of hijabs in various fabrics and colors',
      image: 'https://picsum.photos/seed/collection-hijab/800/1000',
      href: '/category/hijabs',
      itemCount: 56,
      color: 'burgundy',
    },
  ];

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container-custom mx-auto">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-charcoal mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our curated collections of modest fashion, each thoughtfully designed
            to suit your lifestyle and occasions
          </p>
        </div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <Link
              key={index}
              href={collection.href}
              className="group relative h-96 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
            >
              {/* Background Image */}
              <div className="absolute inset-0">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col justify-end p-6 text-white">
                <div className="mb-2">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      collection.color === 'emerald'
                        ? 'bg-emerald'
                        : collection.color === 'gold'
                        ? 'bg-gold text-charcoal'
                        : 'bg-burgundy'
                    }`}
                  >
                    {collection.itemCount} Items
                  </span>
                </div>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
                  {collection.name}
                </h2>
                <p className="text-white/90 text-sm mb-4">
                  {collection.description}
                </p>
                <div className="flex items-center gap-2 text-gold font-semibold group-hover:gap-3 transition-all">
                  Explore Collection
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center bg-emerald/10 rounded-2xl p-12">
          <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
            Can't Find What You're Looking For?
          </h2>
          <p className="text-gray-600 mb-6">
            Browse our complete catalog or get in touch with our styling experts
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="btn btn-primary bg-emerald text-white px-8 py-3 rounded-lg font-semibold hover:bg-emerald-dark transition-colors"
            >
              Browse All Products
            </Link>
            <Link
              href="/contact"
              className="btn btn-secondary bg-transparent border-2 border-emerald text-emerald px-8 py-3 rounded-lg font-semibold hover:bg-emerald hover:text-white transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
