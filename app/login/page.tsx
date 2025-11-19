'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock authentication - in real app, call API
    router.push('/account');
  };

  return (
    <div className="min-h-screen bg-cream islamic-pattern flex items-center justify-center py-16">
      <div className="w-full max-w-md">
        <div className="card bg-white p-8">
          {/* Logo */}
          <div className="text-center mb-8">
            <h1 className="font-display text-3xl font-bold text-emerald mb-2">
              Noor <span className="text-gold">Modest Wear</span>
            </h1>
            <p className="text-gray-600">
              {isLogin ? 'Welcome back!' : 'Create your account'}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex mb-6 border-b border-gray-200">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 pb-3 font-semibold transition-colors relative ${
                isLogin ? 'text-emerald' : 'text-gray-600'
              }`}
            >
              Login
              {isLogin && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald" />}
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 pb-3 font-semibold transition-colors relative ${
                !isLogin ? 'text-emerald' : 'text-gray-600'
              }`}
            >
              Sign Up
              {!isLogin && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald" />}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <Input
                label="Full Name"
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            )}
            <Input
              label="Email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            <Input
              label="Password"
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            {isLogin && (
              <div className="flex justify-end">
                <Link href="/forgot-password" className="text-sm text-emerald hover:underline">
                  Forgot Password?
                </Link>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full">
              {isLogin ? 'Login' : 'Sign Up'}
            </Button>
          </form>

          {/* Social Login */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <Button variant="outline" className="w-full">
                Google
              </Button>
              <Button variant="outline" className="w-full">
                Facebook
              </Button>
            </div>
          </div>
        </div>

        <p className="text-center mt-6 text-sm text-gray-600">
          By continuing, you agree to our{' '}
          <Link href="/terms" className="text-emerald hover:underline">
            Terms
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-emerald hover:underline">
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
