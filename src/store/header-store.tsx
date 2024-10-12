import { create } from 'zustand';

interface HeaderState {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;

  lastScrollY: number;
  setLastScrollY: (value: number) => void;

  hasScrolled: boolean;
  setHasScrolled: (value: boolean) => void;

  isShow: boolean;
  setShow: (value: boolean) => void;
}


export const useHeader = create<HeaderState>()((set) => ({
  isVisible: true,
  setIsVisible: (value: boolean) => set({ isVisible: value }),

  lastScrollY: 0,
  setLastScrollY: (value: number) => set({ lastScrollY: value }),

  hasScrolled: false,
  setHasScrolled: (value: boolean) => set({ hasScrolled: value }),

  isShow: false,
  setShow: (value: boolean) => set({ isShow: value }),
}));

