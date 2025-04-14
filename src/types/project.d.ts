export type ProjectMetadata = {
  title: string;
  description: string;
  tags: string[];
  cover: string[];
  project_url?: string;
  repository?: string;
  figma_url?: string;
  date?: Date | string;
  category: ProjectCategory[];
  slug: string;
};

export type ProjectCategory = 'web' | 'design' | 'fivem' | 'it' | 'other';
