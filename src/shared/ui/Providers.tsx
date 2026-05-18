'use client';

import React from 'react';
import { ThemeProvider } from 'next-themes';

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange>
    {children}
  </ThemeProvider>
);
