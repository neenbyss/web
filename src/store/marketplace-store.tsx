// context/PortfolioContext.tsx
'use client';

import type { SliderValue } from '@nextui-org/slider';
import { createContext, useContext, type ReactNode, useRef } from 'react';
import { createStore, useStore } from 'zustand';

type ContentMode = "list_box" | "grid_box";

export type MarketplaceProps = {
  search: string;
  mode_content: ContentMode;
  price_range: SliderValue;
  setPriceRange: (range: SliderValue) => void
  setSearch: (search: string) => void;
  setModeContent: (mode: ContentMode) => void
};

const createMarketplaceStore = () => createStore<MarketplaceProps>((set) => ({
  search: '',
  mode_content: 'grid_box',
  price_range: [0, 5000],
  setPriceRange: price_range => set({ price_range }),
  setSearch: (search) => set({ search }),
  setModeContent: (mode_content) => set({ mode_content })
}));

const MarketplaceContext = createContext<ReturnType<typeof createMarketplaceStore> | null>(null);

export function MarketplaceProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef<ReturnType<typeof createMarketplaceStore>>();

  if (!storeRef.current) {
    storeRef.current = createMarketplaceStore();
  }

  return (
    <MarketplaceContext.Provider value={storeRef.current}>
      {children}
    </MarketplaceContext.Provider>
  );
}

export const useMarketplace = () => {
  const store = useContext(MarketplaceContext);

  if (!store) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }

  return useStore(store);
}
