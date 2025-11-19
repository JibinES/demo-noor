import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  variant?: 'new' | 'sale' | 'bestseller' | 'out-of-stock';
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = 'new', children, className }: BadgeProps) {
  const variantClasses = {
    new: 'badge-new bg-emerald text-white',
    sale: 'badge-sale bg-burgundy text-white',
    bestseller: 'badge-bestseller bg-gold text-charcoal',
    'out-of-stock': 'bg-gray-500 text-white',
  };

  return (
    <span
      className={cn(
        'badge inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold uppercase',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
