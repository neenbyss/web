import './globals.css';

import { Outfit } from 'next/font/google';
import { createMetadata } from '@/lib/metadata';
import { Providers } from './providers';
import { Viewport } from 'next';
import { GoogleAnalytics } from '@/components/layout/google-analytics';

export const viewport: Viewport = {
  themeColor: '#191B20',
};

export const metadata = createMetadata({
  title: {
    default: 'Programador FiveM y desarrollo a medida | Neenbyss',
    template: '%s | Neenbyss',
  },
  description:
    'Scripts FiveM a medida, reparación y optimización para ESX y QBCore, ropa/EUP y NUI. Webs y UI que convierten. Cotiza sin compromiso, respuesta en menos de 24 h.',
});

const font = Outfit({
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='es'>
      <body className={font.className + ' antialiased'}>
        <GoogleAnalytics measurementId='G-PNEFE3E0PD' />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
