'use client';

declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js',
      targetId: string | Date,
      config?: {
        [key: string]: any;
      },
    ) => void;
  }
}

export const useAnalytics = () => {
  const trackEvent = (eventName: string, parameters?: { [key: string]: any }) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, {
        ...parameters,
      });
    }
  };

  const trackPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-PNEFE3E0PD', {
        page_path: url,
      });
    }
  };

  return {
    trackEvent,
    trackPageView,
  };
};
