'use client';
import * as TabsPrimitive from '@radix-ui/react-tabs';
import * as React from 'react';

import { cn } from '@/lib/utils';
export const Tabs = TabsPrimitive.Root;
export function TabsList({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      className={cn('inline-grid rounded-lg bg-slate-100 p-1 text-slate-700', className)}
      {...props}
    />
  );
}
export function TabsTrigger({
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      className={cn(
        'inline-flex select-none items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium data-[state=active]:bg-white data-[state=active]:shadow data-[state=active]:text-slate-900 transition-colors',
        className
      )}
      {...props}
    />
  );
}
