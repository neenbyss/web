import './globals.css';

import { Outfit } from 'next/font/google';
import { createMetadata } from '@/lib/metadata';
import { Providers } from './providers';

export const metadata = createMetadata({
  title: {
    default: 'Neenbyss - Arquitectos digitales',
    template: '%s | Neenbyss - Arquitectos digitales',
  },
  description:
    'Diseñamos software a medida que se adapta a tus necesidades actuales y evoluciona contigo, garantizando que siempre estés un paso adelante en tecnología e innovación.',
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
    <html lang='en'>
      <body className={font.className + ' antialiased'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
