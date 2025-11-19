'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Check, CreditCard, Truck, Package, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useCartStore } from '@/lib/store';
import { formatPrice } from '@/lib/utils';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getSubtotal, clearCart } = useCartStore();
  const [currentStep, setCurrentStep] = useState(1);

  // Form states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    address: '',
    pinCode: '',
    city: '',
    state: '',
    paymentMethod: 'upi',
  });

  const subtotal = getSubtotal();
  const shipping = subtotal >= 999 ? 0 : 99;
  const tax = Math.round(subtotal * 0.18);
  const total = subtotal + shipping + tax;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-cream flex items-center justify-center py-16">
        <div className="text-center">
          <ShoppingBag className="w-16 h-16 mx-auto mb-4 text-gray-400" />
          <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
          <Button onClick={() => router.push('/')}>Continue Shopping</Button>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, name: 'Delivery', icon: Truck },
    { number: 2, name: 'Payment', icon: CreditCard },
    { number: 3, name: 'Confirmation', icon: Package },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContinueToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep(3);
    // In a real app, process payment here
    setTimeout(() => {
      clearCart();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-cream py-8">
      <div className="container-custom mx-auto">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {steps.map((step, index) => {
              const StepIcon = step.icon;
              const isCompleted = currentStep > step.number;
              const isActive = currentStep === step.number;

              return (
                <React.Fragment key={step.number}>
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center mb-2 transition-all ${
                        isCompleted
                          ? 'bg-gold text-white'
                          : isActive
                          ? 'bg-emerald text-white'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {isCompleted ? <Check className="w-8 h-8" /> : <StepIcon className="w-8 h-8" />}
                    </div>
                    <span
                      className={`text-sm font-semibold ${
                        isActive ? 'text-emerald' : 'text-gray-600'
                      }`}
                    >
                      {step.name}
                    </span>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-24 h-1 mx-4 transition-all ${
                        isCompleted ? 'bg-gold' : 'bg-gray-300'
                      }`}
                    />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {currentStep === 1 && (
              <div className="card bg-white p-8">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                  Delivery Information
                </h2>
                <form onSubmit={handleContinueToPayment} className="space-y-4">
                  <Input
                    label="Full Name"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      label="Email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="Mobile Number"
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Input
                    label="Address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Input
                      label="Pin Code"
                      name="pinCode"
                      value={formData.pinCode}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="City"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      required
                    />
                    <Input
                      label="State"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Continue to Payment
                  </Button>
                </form>
              </div>
            )}

            {currentStep === 2 && (
              <div className="card bg-white p-8">
                <h2 className="font-display text-2xl font-bold text-charcoal mb-6">
                  Payment Method
                </h2>
                <form onSubmit={handlePlaceOrder} className="space-y-6">
                  <div className="space-y-4">
                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-emerald transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-emerald"
                      />
                      <span className="ml-3 font-semibold">UPI</span>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-emerald transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-emerald"
                      />
                      <span className="ml-3 font-semibold">Credit/Debit Card</span>
                    </label>
                    <label className="flex items-center p-4 border-2 border-gray-300 rounded-lg cursor-pointer hover:border-emerald transition-colors">
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleInputChange}
                        className="w-5 h-5 text-emerald"
                      />
                      <span className="ml-3 font-semibold">Cash on Delivery</span>
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="secondary"
                      size="lg"
                      className="flex-1"
                      onClick={() => setCurrentStep(1)}
                    >
                      Back
                    </Button>
                    <Button type="submit" size="lg" className="flex-1">
                      Place Order
                    </Button>
                  </div>
                </form>
              </div>
            )}

            {currentStep === 3 && (
              <div className="card bg-white p-8 text-center">
                <div className="w-24 h-24 bg-success rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Check className="w-12 h-12 text-white" />
                </div>
                <h2 className="font-display text-3xl font-bold text-charcoal mb-4">
                  Order Placed Successfully!
                </h2>
                <p className="text-gray-600 mb-2">Thank you for shopping with us</p>
                <p className="text-lg font-semibold text-emerald mb-8">
                  Order #NMW{Math.floor(Math.random() * 1000000)}
                </p>
                <p className="text-gray-700 mb-8">
                  A confirmation email has been sent to {formData.email}
                </p>
                <div className="flex gap-4 justify-center">
                  <Button onClick={() => router.push('/')}>
                    Continue Shopping
                  </Button>
                  <Button variant="secondary" onClick={() => router.push('/account/orders')}>
                    View Orders
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="card bg-white p-6 sticky top-24">
              <h3 className="font-display text-xl font-bold text-charcoal mb-4">
                Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                {items.map((item, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="text-sm">
                      <p className="font-semibold text-charcoal line-clamp-1">
                        {item.product.name}
                      </p>
                      <p className="text-gray-600">
                        {item.selectedColor.name} • {item.selectedSize} • Qty: {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Price Details */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span className="font-semibold">
                    {shipping === 0 ? <span className="text-success">FREE</span> : formatPrice(shipping)}
                  </span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Tax</span>
                  <span className="font-semibold">{formatPrice(tax)}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-charcoal">Total</span>
                  <span className="text-2xl font-bold text-emerald">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
