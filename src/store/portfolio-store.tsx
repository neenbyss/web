// context/PortfolioContext.tsx
'use client';

import { createContext, useContext, type ReactNode, useRef } from 'react';
import { createStore, useStore } from 'zustand';

type ContentMode = "list_box" | "grid_box";

export type PortfolioProps = {
  search: string;
  mode_content: ContentMode;
  setSearch: (search: string) => void;
  setModeContent: (mode: ContentMode) => void
};

const createPortfolioStore = () => createStore<PortfolioProps>((set) => ({
  search: '',
  mode_content: 'grid_box',
  setSearch: (search) => set({ search }),
  setModeContent: (mode_content) => set({ mode_content })
}));

const PortfolioContext = createContext<ReturnType<typeof createPortfolioStore> | null>(null);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<ReturnType<typeof createPortfolioStore>>();

  if (!storeRef.current) {
    storeRef.current = createPortfolioStore();
  }

  return (
    <PortfolioContext.Provider value={storeRef.current}>
      {children}
    </PortfolioContext.Provider>
  );
}

export const usePortfolio = () => {
  const store = useContext(PortfolioContext);

  if (!store) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }

  return useStore(store);
}
