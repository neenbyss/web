import type { Metadata } from 'next/types';

interface CreateMetadataOptions extends Metadata {
  service?: 'fivem' | 'web-development' | 'ui-ux-design';
  structuredData?: object;
  canonical?: string;
}

export function createMetadata(override: CreateMetadataOptions): Metadata {
  const baseUrl = 'https://neenbyss.com';

  const defaultRobots = {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  };

  return {
    ...override,
    metadataBase: new URL(baseUrl),

    keywords: override.keywords ?? [
      'programador fivem',
      'scripts fivem personalizados',
      'configuración servidor fivem',
      'desarrollo web profesional',
      'diseño ui/ux profesional',
      'software a medida',
    ],

    verification: {
      google: 'XT7x0HHqbiVimZrZ_-2dU6j00DSSsmOLpLQabAixFNM',
    },

    authors: [{ name: 'Neenbyss Team', url: baseUrl }],
    creator: 'Neenbyss',
    publisher: 'Neenbyss - Arquitectos Digitales',

    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },

    openGraph: {
      title: override.title ?? 'Neenbyss - Arquitectos Digitales',
      description:
        override.description ??
        'Diseñamos software a medida que se adapta a tus necesidades actuales y evoluciona contigo.',
      url: override.openGraph?.url ?? baseUrl,
      siteName: 'Neenbyss',
      images: override.openGraph?.images ?? [
        {
          url: `${baseUrl}/og.png`,
          width: 1200,
          height: 630,
          alt: 'Neenbyss - Soluciones tecnológicas integrales',
        },
      ],
      locale: 'es_MX',
      type: 'website',
      ...override.openGraph,
    },

    twitter: {
      card: 'summary_large_image',
      title: override.title ?? 'Neenbyss - Arquitectos Digitales',
      description:
        override.description ??
        'Diseñamos software a medida que se adapta a tus necesidades actuales y evoluciona contigo.',
      images: override.twitter?.images ?? [`${baseUrl}/og.png`],
      creator: '@neenbyss', // Agregar si tienes Twitter
      site: '@neenbyss',
      ...override.twitter,
    },

    alternates: {
      canonical: override.canonical ?? (override.openGraph?.url as string) ?? baseUrl,
      languages: {
        'es-MX': baseUrl,
        es: baseUrl,
      },
      ...override.alternates,
    },

    category: 'technology',

    applicationName: 'Neenbyss',
    referrer: 'origin-when-cross-origin',

    icons: {
      // Solo se referencia favicon.ico porque es el único asset de icono que
      // existe en el proyecto (src/app/favicon.ico). TODO(propietario):
      // entregar icon.png (192x192), icon-dark.png y apple-icon.png (180x180)
      // si se quieren iconos PWA/Apple dedicados.
      icon: [{ url: '/favicon.ico', sizes: '32x32' }],
      shortcut: '/favicon.ico',
    },
  };
}

export function generateStructuredData(type: 'Service' | 'Organization' | 'WebPage', data: any) {
  const baseStructure = {
    '@context': 'https://schema.org',
    '@type': type,
  };

  switch (type) {
    case 'Organization':
      return {
        ...baseStructure,
        name: 'Neenbyss',
        url: 'https://neenbyss.com',
        // TODO(propietario): logo.png no existe en public/. Se usa og.png
        // como imagen de marca provisional; entregar un logo cuadrado real.
        logo: 'https://neenbyss.com/og.png',
        description:
          'Especialistas en desarrollo de software personalizado, configuración de servidores FiveM y diseño UI/UX profesional.',
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'MX',
        },
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'customer service',
          availableLanguage: ['Spanish', 'English'],
        },
        sameAs: ['https://twitter.com/neenbyss', 'https://linkedin.com/company/neenbyss'],
        ...data,
      };

    case 'Service':
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        provider: {
          '@type': 'Organization',
          name: 'Neenbyss',
          url: 'https://neenbyss.com',
        },
        areaServed: [
          { '@type': 'Country', name: 'España' },
          { '@type': 'Country', name: 'México' },
          { '@type': 'Country', name: 'Chile' },
          { '@type': 'Country', name: 'Perú' },
          { '@type': 'Country', name: 'Colombia' },
          { '@type': 'Country', name: 'Argentina' },
          { '@type': 'Place', name: 'Latinoamérica' },
        ],
        availableLanguage: ['Spanish', 'es-MX', 'es-ES'],
        serviceType: data.serviceType,
        offers: {
          '@type': 'Offer',
          availability: 'https://schema.org/InStock',
          priceRange: data.priceRange || '$$$',
        },
        ...data,
      };

    case 'WebPage':
      return {
        ...baseStructure,
        name: data.name,
        description: data.description,
        url: data.url,
        isPartOf: {
          '@type': 'WebSite',
          name: 'Neenbyss',
          url: 'https://neenbyss.com',
        },
        ...data,
      };

    default:
      return { ...baseStructure, ...data };
  }
}
