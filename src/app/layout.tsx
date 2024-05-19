import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import '@/app/globals.css';
import { cn } from '@/lib/utils';
import Providers from '@/component/Providers';

const font = Montserrat({ subsets: ['vietnamese'] });

export const metadata: Metadata = {
  title: 'Welcome to F-LocalBrand!',
  description: 'High quality products for your daily needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          font.className
        )}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
