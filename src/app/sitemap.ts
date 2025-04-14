import type { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: 'https://neenbyss.com/',
      lastModified,
    },
    {
      url: 'https://neenbyss.com/privacy/',
      lastModified,
    },
    {
      url: 'https://neenbyss.com/services/',
      lastModified,
    },
    {
      url: 'https://neenbyss.com/services/fivem/',
      lastModified,
    },
    {
      url: 'https://neenbyss.com/services/web_development/',
      lastModified,
    },
    {
      url: 'https://neenbyss.com/services/ui_ux_design/',
      lastModified,
    },
    {
      url: 'https://neenbyss.com/terms',
      lastModified,
    },
    {
      url: 'https://neenbyss.com/terms-software',
      lastModified,
    },
    {
      url: 'https://neenbyss.com/contact',
      lastModified,
    },
  ];
}
