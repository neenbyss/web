'use client';

import { ProjectMetadata } from '@/types/project';
import { getAllMDX } from '@/utils/mdx';
import { createContext, useContext, type ReactNode, useRef } from 'react';
import { createStore, useStore } from 'zustand';

type ContentMode = 'list_box' | 'grid_box';

type ProjectsCallback = ReturnType<typeof getAllMDX<ProjectMetadata>>;

export type PortfolioProps = {
  search: string;
  mode_content: ContentMode;
  category: string;
  callbackProjects: ProjectsCallback;
  setCategory: (category: string) => void;
  setSearch: (search: string) => void;
  setModeContent: (mode: ContentMode) => void;
};

const createProjectsStore = ({
  category,
  search,
  callbackProjects,
}: {
  category?: string;
  search?: string;
  callbackProjects: ProjectsCallback;
}) =>
  createStore<PortfolioProps>((set) => ({
    search: search ?? '',
    mode_content: 'grid_box',
    category: category ?? '',
    callbackProjects,
    setCategory: (category) => set({ category }),
    setSearch: (search) => set({ search }),
    setModeContent: (mode_content) => set({ mode_content }),
  }));

const ProjectContext = createContext<ReturnType<typeof createProjectsStore> | null>(null);

export function ProjectProvider({
  children,
  ...rest
}: {
  children: ReactNode;
  category?: string;
  search?: string;
  callbackProjects: ProjectsCallback;
}) {
  const storeRef = useRef<ReturnType<typeof createProjectsStore>>(null);

  if (!storeRef.current) {
    storeRef.current = createProjectsStore(rest);
  }

  return <ProjectContext.Provider value={storeRef.current}>{children}</ProjectContext.Provider>;
}

export const useProject = () => {
  const store = useContext(ProjectContext);

  if (!store) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }

  return useStore(store);
};
