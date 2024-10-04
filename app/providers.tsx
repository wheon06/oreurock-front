'use client';

import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      <NextThemesProvider
        attribute='class'
        defaultTheme='light'
        themes={['dark', 'light', 'modern']}
      >
        {children}
      </NextThemesProvider>
    </NextUIProvider>
  );
}
