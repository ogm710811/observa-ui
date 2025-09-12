import * as React from 'react';

import { cn } from '@/lib/utils';
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md';
};
export function Button({ className, variant = 'default', size = 'md', ...props }: ButtonProps) {
  const base =
    'inline-flex items-center justify-center rounded-sm text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 shadow-sm';
  const sizes = { sm: 'h-8 px-3', md: 'h-10 px-4' };
  const variants = {
    default: 'bg-slate-900 text-white hover:bg-slate-800',
    outline: 'border border-slate-200 bg-white hover:bg-slate-50',
    ghost: 'hover:bg-slate-100',
  } as const;
  return <button className={cn(base, sizes[size], variants[variant], className)} {...props} />;
}
