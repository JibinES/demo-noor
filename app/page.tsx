import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, RotateCcw, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ProductCard } from '@/components/products/ProductCard';
import { getFeaturedProducts, getNewArrivals } from '@/data/products';

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const newArrivals = getNewArrivals();

  const categories = [
    {
      name: 'Everyday Abayas',
      image: 'https://picsum.photos/seed/category-abayas-1/600/800',
      href: '/category/abayas',
    },
    {
      name: 'Designer Burkhas',
      image: 'https://picsum.photos/seed/category-burkhas-2/600/800',
      href: '/category/burkhas',
    },
    {
      name: 'Premium Hijabs',
      image: 'https://picsum.photos/seed/category-hijabs-3/600/800',
      href: '/category/hijabs',
    },
    {
      name: 'Maxi Dresses',
      image: 'https://picsum.photos/seed/category-dresses-4/600/800',
      href: '/category/maxi-dresses',
    },
  ];

  const testimonials = [
    {
      name: 'Ayesha Khan',
      rating: 5,
      comment: 'The quality of the abayas is exceptional! Beautiful embroidery and comfortable fabric. Highly recommended!',
      image: 'https://picsum.photos/seed/customer-ayesha/100/100',
    },
    {
      name: 'Fatima Ahmed',
      rating: 5,
      comment: 'Love the modest designs! Perfect for both daily wear and special occasions. Fast delivery too!',
      image: 'https://picsum.photos/seed/customer-fatima/100/100',
    },
    {
      name: 'Zainab Ali',
      rating: 5,
      comment: 'Finally found a store that understands modest fashion! The hijabs are soft and stay in place all day.',
      image: 'https://picsum.photos/seed/customer-zainab/100/100',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden islamic-pattern">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald/20 via-transparent to-gold/20" />

        <div className="relative z-10 container-custom mx-auto text-center px-4">
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-charcoal mb-6 animate-fade-in">
            Elegance Meets <span className="gradient-text">Modesty</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto animate-slide-up">
            Discover premium burkhas, abayas, and modest fashion that combines faith with contemporary style
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up">
            <Button size="lg" variant="primary">
              Explore New Collection
            </Button>
            <Button size="lg" variant="secondary">
              Shop by Occasion
            </Button>
          </div>
          <div className="mt-8 inline-flex items-center gap-2 bg-gold text-charcoal px-6 py-3 rounded-full font-semibold">
            ✨ Free Shipping Above ₹999
          </div>
        </div>
      </section>

      {/* Quick Category Navigation */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
              Shop by Category
            </h2>
            <div className="decorative-line max-w-xs mx-auto" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="group relative h-80 rounded-xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-display text-2xl font-bold mb-2">{category.name}</h3>
                  <span className="inline-flex items-center gap-2 text-gold font-semibold group-hover:gap-3 transition-all">
                    Shop Now <ArrowRight className="w-5 h-5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="section-padding bg-cream-dark">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
                New Arrivals
              </h2>
              <p className="text-gray-600">Discover our latest modest fashion collection</p>
            </div>
            <Link href="/new-arrivals" className="hidden md:inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/new-arrivals">
              <Button variant="secondary">View All New Arrivals</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products / Bestsellers */}
      <section className="section-padding bg-white">
        <div className="container-custom mx-auto">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-2">
                Best Sellers
              </h2>
              <p className="text-gray-600">Our customers' favorite picks</p>
            </div>
            <Link href="/bestsellers" className="hidden md:inline-flex items-center gap-2 text-emerald font-semibold hover:gap-3 transition-all">
              View All <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="section-padding bg-emerald/5">
        <div className="container-custom mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-charcoal mb-4">
              What Our Customers Say
            </h2>
            <p className="text-gray-600">Join thousands of satisfied modest fashion lovers</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card p-6 bg-white">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-gold text-gold" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.comment}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image src={testimonial.image} alt={testimonial.name} fill className="object-cover" />
                  </div>
                  <div>
                    <p className="font-semibold text-charcoal">{testimonial.name}</p>
                    <p className="text-sm text-gray-500">Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="section-padding bg-white border-y border-gray-200">
        <div className="container-custom mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal mb-2">Premium Quality</h3>
              <p className="text-gray-600 text-sm">100% authentic fabrics and craftsmanship</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <Truck className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal mb-2">Free Shipping</h3>
              <p className="text-gray-600 text-sm">On all orders above ₹999</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-emerald/10 flex items-center justify-center mb-4">
                <RotateCcw className="w-8 h-8 text-emerald" />
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal mb-2">Easy Returns</h3>
              <p className="text-gray-600 text-sm">Hassle-free 7-day return policy</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mb-4">
                <CreditCard className="w-8 h-8 text-gold" />
              </div>
              <h3 className="font-display text-lg font-bold text-charcoal mb-2">Secure Shopping</h3>
              <p className="text-gray-600 text-sm">100% safe and secure payments</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="section-padding bg-gradient-to-r from-emerald to-emerald-dark text-white">
        <div className="container-custom mx-auto text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Discover Your Perfect Modest Style
          </h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Explore our complete collection of elegant burkhas, abayas, and hijabs designed for the modern modest dresser
          </p>
          <Button size="lg" variant="gold">
            Shop All Collections
          </Button>
        </div>
      </section>
    </div>
  );
}
