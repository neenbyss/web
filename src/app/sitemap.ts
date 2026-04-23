import { getAllProjects } from '@/lib/get-projects';
import type { MetadataRoute } from 'next';

const baseUrl = 'https://neenbyss.com';

// URLs estáticas con prioridades y frecuencias optimizadas
const staticRoutes = [
  { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/services/`, priority: 0.9, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/services/fivem/`, priority: 0.8, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/services/fivem/ropa/`, priority: 0.75, changeFrequency: 'monthly' as const },
  {
    url: `${baseUrl}/services/fivem/scripts/`,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
  },
  {
    url: `${baseUrl}/services/web-development/`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  { url: `${baseUrl}/services/ui-ux-design/`, priority: 0.8, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/projects/`, priority: 0.7, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/contact/`, priority: 0.6, changeFrequency: 'monthly' as const },
  { url: `${baseUrl}/privacy/`, priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${baseUrl}/terms/`, priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${baseUrl}/terms-software/`, priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${baseUrl}/terms-fivem/`, priority: 0.3, changeFrequency: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();

  const staticPages = staticRoutes.map((route) => ({
    url: route.url,
    lastModified: now,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }));

  const { data: projects } = await getAllProjects();

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    lastModified: now,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...projectPages];
}
