import type { Metadata } from 'next/types';

export function createMetadata(override: Metadata): Metadata {
  return {
    ...override,
    metadataBase: new URL('https://neenbyss.com'),
    keywords: override.keywords ?? [
      'software a medida',
      'sistemas personalizados',
      'aplicaciones web',
      'automatización empresarial',
      'Neenbyss',
    ],
    verification: {
      google: 'XT7x0HHqbiVimZrZ_-2dU6j00DSSsmOLpLQabAixFNM',
    },
    openGraph: {
      title: override.title ?? undefined,
      description: override.description ?? undefined,
      url: 'https://neenbyss.com',
      siteName: 'Neenbyss',
      images: ['https://neenbyss.com/og.png'],
      type: 'website',
      ...override.openGraph,
    },
    twitter: {
      card: 'summary_large_image',
      title: override.title ?? 'Neenbyss',
      description: override.description ?? 'Creamos soluciones tecnológicas únicas para empresas.',
      images: ['https://neenbyss.com/og.png'],
      ...override.twitter,
    },
  };
}
