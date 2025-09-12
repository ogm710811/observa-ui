import * as React from 'react';

import { cn } from '@/lib/utils';
export function Label({
  className,
  children,
  ...props
}: React.LabelHTMLAttributes<HTMLLabelElement> & { htmlFor: string; children: React.ReactNode }) {
  return (
    <label className={cn('text-sm font-medium text-slate-700', className)} {...props}>
      {children}
    </label>
  );
}
