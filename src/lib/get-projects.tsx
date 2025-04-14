import type { ProjectMetadata } from '@/types/project';
import { getAllMDX, getMDX } from '@/utils/mdx';

const dir = '/src/app/(static)/projects/(content)';

export const getProject = async (id: string) => {
  return await getMDX<ProjectMetadata>(dir, id);
};

export const getAllProjects = async () => {
  return await getAllMDX<ProjectMetadata>(dir);
};
