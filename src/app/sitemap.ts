import { getAllProjects } from '@/lib/get-projects';
import { getAllMDX } from '@/utils/mdx';
import type { MetadataRoute } from 'next';

const baseUrl = 'https://neenbyss.com';

// URLs estáticas con prioridades y frecuencias optimizadas.
// NOTA: las rutas usan los slugs reales del App Router (web_development y
// ui_ux_design con guion bajo). No usar guiones: esas URLs no existen.
const staticRoutes = [
  { url: `${baseUrl}/`, priority: 1.0, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/services/`, priority: 0.9, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/services/fivem/`, priority: 0.8, changeFrequency: 'weekly' as const },
  {
    url: `${baseUrl}/services/fivem/reparar-optimizar/`,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
  },
  {
    url: `${baseUrl}/services/fivem/crear-servidor/`,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
  },
  {
    url: `${baseUrl}/services/fivem/nui-ui/`,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
  },
  { url: `${baseUrl}/services/minecraft/`, priority: 0.7, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/services/fivem/ropa/`, priority: 0.75, changeFrequency: 'monthly' as const },
  {
    url: `${baseUrl}/services/fivem/scripts/`,
    priority: 0.75,
    changeFrequency: 'monthly' as const,
  },
  {
    url: `${baseUrl}/services/web_development/`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  },
  { url: `${baseUrl}/services/ui_ux_design/`, priority: 0.8, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/projects/`, priority: 0.7, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/blog/`, priority: 0.5, changeFrequency: 'weekly' as const },
  { url: `${baseUrl}/faqs/`, priority: 0.5, changeFrequency: 'monthly' as const },
  { url: `${baseUrl}/contact/`, priority: 0.6, changeFrequency: 'monthly' as const },
  { url: `${baseUrl}/privacy/`, priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${baseUrl}/terms/`, priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${baseUrl}/terms-software/`, priority: 0.3, changeFrequency: 'yearly' as const },
  { url: `${baseUrl}/terms-fivem/`, priority: 0.3, changeFrequency: 'yearly' as const },
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Sin lastModified: no hay fechas de modificación confiables por página y
  // una fecha dinámica produciría una falsa actualización constante.
  const staticPages = staticRoutes.map((route) => ({
    url: route.url,
    priority: route.priority,
    changeFrequency: route.changeFrequency,
  }));

  const { data: projects } = await getAllProjects();

  const projectPages = projects.map((project) => ({
    url: `${baseUrl}/projects/${project.slug}`,
    priority: 0.6,
    changeFrequency: 'monthly' as const,
  }));

  const { data: posts } = await getAllMDX<{ slug: string }>('src/app/(static)/blog/(content)');

  const postPages = posts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    priority: 0.5,
    changeFrequency: 'monthly' as const,
  }));

  return [...staticPages, ...projectPages, ...postPages];
}
