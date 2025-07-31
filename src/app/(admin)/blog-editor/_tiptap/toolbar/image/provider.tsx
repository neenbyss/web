'use client';

import { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { ImageMetadata } from '../../types/image';

type Tab = 'upload' | 'media';
type UploadStatus = 'idle' | 'uploading' | 'done' | 'selected';

type MediaContextType = {
  tab: Tab;
  setTab: (value: Tab) => void;
  isTab: (value: Tab) => boolean;

  isUploading: boolean;

  images: ImageMetadata[];
  setImages: (imgs: ImageMetadata[]) => void;
  addImage: (img: ImageMetadata) => void;

  activeImage: ImageMetadata | null;
  status: UploadStatus;
  isDeleting: boolean;

  startUpload: (name: string) => void;
  finishUpload: (img: ImageMetadata | null) => void;
  selectImage: (img: ImageMetadata) => void;
  clearActiveImage: () => void;
  deleteActiveImage: () => Promise<void>;

  updateMetadata: (field: keyof ImageMetadata['metadata'], value: string) => void;
};

const MediaContext = createContext<MediaContextType | undefined>(undefined);

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [tab, setTab] = useState<Tab>('upload');
  const [images, setImages] = useState<ImageMetadata[]>([]);
  const [activeImage, setActiveImage] = useState<ImageMetadata | null>(null);
  const [status, setStatus] = useState<UploadStatus>('idle');
  const [isDeleting, setIsDeleting] = useState(false);

  const isTab = useCallback((value: Tab) => tab === value, [tab]);

  const isUploading = useMemo(() => {
    return status === 'uploading';
  }, [status]);

  const addImage = (img: ImageMetadata) => {
    setImages((prev) => [img, ...prev]);
  };

  const startUpload = (name: string) => {
    setActiveImage({
      url: '',
      name,
      width: 0,
      height: 0,
      sizeKB: 0,
      date: '',
      metadata: {},
    });
    setStatus('uploading');
  };

  const finishUpload = useCallback((img: ImageMetadata | null) => {
    setActiveImage(img);
    if (!img) {
      return setStatus('idle');
    }
    setActiveImage(img);
    addImage(img);
    setStatus('done');
  }, []);

  const selectImage = useCallback(
    (img: ImageMetadata) => {
      if (isUploading) {
        return;
      }
      if (activeImage?.url === img.url) {
        clearActiveImage();
        return;
      }
      setActiveImage(img);
      setStatus('selected');
    },
    [activeImage?.url, isUploading],
  );

  const clearActiveImage = () => {
    setActiveImage(null);
    setStatus('idle');
  };

  const updateMetadata = useCallback((field: keyof ImageMetadata['metadata'], value: string) => {
    setActiveImage((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        metadata: {
          ...prev.metadata,
          [field]: value,
        },
      };
    });
  }, []);

  const deleteActiveImage = useCallback(async () => {
    if (!activeImage) return;

    setIsDeleting(true);
    //await deleteImage(activeImage.name);

    setImages((prev) => prev.filter((img) => img.name !== activeImage.name));
    clearActiveImage();
    setIsDeleting(false);
  }, [activeImage]);

  return (
    <MediaContext.Provider
      value={{
        tab,
        setTab,
        isTab,
        images,
        setImages,
        addImage,
        activeImage,
        status,
        isDeleting,
        startUpload,
        finishUpload,
        selectImage,
        clearActiveImage,
        deleteActiveImage,
        updateMetadata,
        isUploading,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  const ctx = useContext(MediaContext);
  if (!ctx) throw new Error('useMedia debe estar dentro de MediaProvider');
  return ctx;
}
