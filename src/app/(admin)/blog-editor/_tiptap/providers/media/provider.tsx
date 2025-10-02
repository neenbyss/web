import React, { createContext, ReactNode, useContext, useState } from 'react';

const contextImage = createContext(null);

export type ImageManageProviderProps = {
  children: ReactNode;
};
export function ImageManageProvider({ children }: ImageManageProviderProps) {
  const [] = useState();
  return <contextImage.Provider value={null}>{children}</contextImage.Provider>;
}

export function useMedia() {
  const ctx = useContext(contextImage);
  if (!ctx) throw new Error('useMedia debe estar dentro de MediaProvider');
  return ctx;
}
