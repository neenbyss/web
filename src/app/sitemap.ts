import { getAllProjects } from '@/lib/get-projects';
import type { MetadataRoute } from 'next';

const statics = [
  'https://neenbyss.com/',
  'https://neenbyss.com/services/',
  'https://neenbyss.com/contact',
  'https://neenbyss.com/services/fivem/',
  'https://neenbyss.com/projects',
  'https://neenbyss.com/services/web_development/',
  'https://neenbyss.com/services/ui_ux_design/',
  'https://neenbyss.com/privacy/',
  'https://neenbyss.com/terms',
  'https://neenbyss.com/terms-software',
  'https://neenbyss.com/terms-fivem',
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date().toISOString();
  const staticPages = statics.map((path) => ({
    url: path,
    lastModified: now,
  }));

  const { data: projects } = await getAllProjects();

  const projectPages = projects.map((project) => ({
    url: `https://neenbyss.com/projects/${project.slug}`,
    lastModified: now,
  }));

  return [...staticPages, ...projectPages];
}
