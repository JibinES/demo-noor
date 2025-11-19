'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, ShoppingBag, Star, Truck, RotateCcw, Shield, Check } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProductCard } from '@/components/products/ProductCard';
import { getProductBySlug, allProducts } from '@/data/products';
import { useCartStore, useWishlistStore } from '@/lib/store';
import { formatPrice, getDeliveryDate } from '@/lib/utils';

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(0);
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const { addItem: addToCart } = useCartStore();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore();

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <Link href="/" className="text-emerald hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);
  const hasDiscount = product.salePrice && product.salePrice > 0;
  const displayPrice = hasDiscount ? product.salePrice : product.price;

  // Get related products
  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, product.colors[selectedColor], selectedSize, quantity);
    // Show success message or redirect to cart
  };

  const handleBuyNow = () => {
    if (!selectedSize) {
      alert('Please select a size');
      return;
    }
    addToCart(product, product.colors[selectedColor], selectedSize, quantity);
    router.push('/cart');
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-cream">
      <div className="container-custom mx-auto py-8">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm">
          <ol className="flex items-center gap-2 text-gray-600">
            <li><Link href="/" className="hover:text-emerald">Home</Link></li>
            <li>/</li>
            <li><Link href={`/category/${product.category}`} className="hover:text-emerald capitalize">{product.category}</Link></li>
            <li>/</li>
            <li className="text-charcoal font-semibold">{product.name}</li>
          </ol>
        </nav>

        {/* Product Detail Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-[3/4] bg-white rounded-xl overflow-hidden mb-4 shadow-card">
              <Image
                src={product.images[selectedImage]}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {!product.inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="out-of-stock" className="text-lg px-6 py-2">Out of Stock</Badge>
                </div>
              )}
            </div>

            {/* Thumbnail Strip */}
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index ? 'border-emerald' : 'border-gray-200 hover:border-emerald/50'
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wider mb-2">
                    {product.brand} • SKU: {product.sku}
                  </p>
                  <h1 className="font-display text-3xl md:text-4xl font-bold text-charcoal">
                    {product.name}
                  </h1>
                </div>
                <button
                  onClick={handleWishlistToggle}
                  className={`p-3 rounded-full transition-all ${
                    inWishlist ? 'bg-gold text-white' : 'bg-white text-charcoal hover:bg-gold hover:text-white'
                  }`}
                >
                  <Heart className={`w-6 h-6 ${inWishlist ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-4xl font-bold text-emerald">
                  {formatPrice(displayPrice!)}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-gray-500 line-through">
                      {formatPrice(product.price)}
                    </span>
                    <Badge variant="sale">Save {product.discountPercentage}%</Badge>
                  </>
                )}
              </div>

              <p className="text-sm text-gray-600 mb-6">Inclusive of all taxes</p>

              {/* Key Highlights */}
              <div className="bg-cream-dark rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-charcoal mb-3">Key Highlights</h3>
                <ul className="space-y-2">
                  {product.features.slice(0, 4).map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-gray-700">
                      <Check className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-charcoal">Select Color</label>
                <span className="text-sm text-gray-600">{product.colors[selectedColor].name}</span>
              </div>
              <div className="flex items-center gap-3">
                {product.colors.map((color, index) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(index)}
                    className={`w-12 h-12 rounded-full border-2 transition-all ${
                      selectedColor === index ? 'border-emerald scale-110' : 'border-gray-300 hover:border-emerald/50'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-3">
                <label className="font-semibold text-charcoal">Select Size</label>
                <Link href="/size-guide" className="text-sm text-emerald hover:underline">
                  Size Guide
                </Link>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 rounded-lg border-2 font-semibold transition-all ${
                      selectedSize === size
                        ? 'bg-emerald border-emerald text-white'
                        : 'bg-white border-gray-300 text-charcoal hover:border-emerald'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-8">
              <label className="font-semibold text-charcoal block mb-3">Quantity</label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-lg bg-white border-2 border-gray-300 hover:border-emerald flex items-center justify-center font-semibold"
                >
                  -
                </button>
                <span className="w-16 text-center font-semibold text-lg">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(5, quantity + 1))}
                  className="w-10 h-10 rounded-lg bg-white border-2 border-gray-300 hover:border-emerald flex items-center justify-center font-semibold"
                >
                  +
                </button>
                <span className="text-sm text-gray-600">Max 5 per order</span>
              </div>
            </div>

            {/* Action Buttons */}
            {product.inStock ? (
              <div className="space-y-3 mb-8">
                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="gold"
                  className="w-full"
                  onClick={handleBuyNow}
                >
                  Buy Now
                </Button>
              </div>
            ) : (
              <div className="bg-gray-100 text-center py-4 rounded-lg mb-8">
                <p className="text-gray-600 font-semibold">Currently Out of Stock</p>
                <p className="text-sm text-gray-500 mt-1">We'll notify you when it's back</p>
              </div>
            )}

            {/* Delivery Info */}
            <div className="space-y-4 border-t border-gray-200 pt-6">
              <div className="flex items-start gap-3">
                <Truck className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal">Free Delivery</p>
                  <p className="text-sm text-gray-600">On orders above ₹999 • Delivered by {getDeliveryDate(5)}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal">Easy Returns</p>
                  <p className="text-sm text-gray-600">7-day return policy • No questions asked</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-charcoal">100% Authentic</p>
                  <p className="text-sm text-gray-600">Quality guaranteed products only</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-xl shadow-card p-8 mb-16">
          {/* Tabs */}
          <div className="flex items-center gap-8 border-b border-gray-200 mb-8">
            {['description', 'specifications', 'reviews'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 font-semibold capitalize transition-colors relative ${
                  activeTab === tab ? 'text-emerald' : 'text-gray-600 hover:text-emerald'
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div>
            {activeTab === 'description' && (
              <div className="prose max-w-none">
                <p className="text-gray-700 mb-6">{product.description}</p>
                <h3 className="font-semibold text-charcoal mb-3">Features:</h3>
                <ul className="space-y-2 mb-6">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <h3 className="font-semibold text-charcoal mb-3">What's Included:</h3>
                <ul className="space-y-1">
                  {product.includedItems.map((item, index) => (
                    <li key={index} className="text-gray-700">• {item}</li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === 'specifications' && (
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-semibold text-charcoal mb-4">Product Details</h3>
                  <dl className="space-y-3">
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">Fabric</dt>
                      <dd className="font-semibold">{product.fabric}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">Style</dt>
                      <dd className="font-semibold capitalize">{product.style}</dd>
                    </div>
                    <div className="flex justify-between py-2 border-b border-gray-200">
                      <dt className="text-gray-600">Occasion</dt>
                      <dd className="font-semibold capitalize">{product.occasion.join(', ')}</dd>
                    </div>
                    {product.neckline && (
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <dt className="text-gray-600">Neckline</dt>
                        <dd className="font-semibold">{product.neckline}</dd>
                      </div>
                    )}
                  </dl>
                </div>
                <div>
                  <h3 className="font-semibold text-charcoal mb-4">Care Instructions</h3>
                  <ul className="space-y-2">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-5 h-5 text-emerald flex-shrink-0 mt-0.5" />
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <div className="flex items-center gap-8 mb-8 pb-8 border-b border-gray-200">
                  <div className="text-center">
                    <div className="text-5xl font-bold text-emerald mb-2">{product.rating}</div>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-gold fill-gold' : 'text-gray-300'}`} />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">{product.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1">
                    {[5, 4, 3, 2, 1].map((stars) => (
                      <div key={stars} className="flex items-center gap-3 mb-2">
                        <span className="text-sm w-8">{stars}★</span>
                        <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gold"
                            style={{ width: `${Math.random() * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-center text-gray-600 py-8">
                  Customer reviews will be displayed here
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="font-display text-3xl font-bold text-charcoal mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
