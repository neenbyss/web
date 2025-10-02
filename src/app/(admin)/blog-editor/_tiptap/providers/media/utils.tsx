'use client';

import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000/api/admin/media';

/** ========== HELPERS ========== **/
async function handleResponse(res: Response) {
  const data = await res.json().catch(() => null);

  if (!res.ok) {
    throw new Error(data?.error || 'Error desconocido en el servidor');
  }

  return data;
}

/** ========== 1. GET - Listar imágenes con paginación ========== **/
export function useImages(page = 1, limit = 20, search = '') {
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pagination, setPagination] = useState<any>(null);
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    async function fetchImages() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API_URL}?page=${page}&limit=${limit}&search=${search}`);
        const json = await handleResponse(res);
        setImages(json.data || []);
        setPagination(json.pagination || null);
        setMetadata(json.metadata || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, [page, limit, search]);

  return { images, loading, error, pagination, metadata };
}

/** ========== 2. POST - Subir imagen ========== **/
export async function uploadImage(file: File) {
  const formData = new FormData();
  formData.append('file', file);

  const res = await fetch(API_URL, {
    method: 'POST',
    body: formData,
  });

  const json = await handleResponse(res);
  return {
    image: json.data, // retorna metadata de la imagen subida
    message: res.statusText || 'Imagen subida',
  };
}

/** ========== 3. PUT - Actualizar metadata ========== **/
export async function updateImageMetadata(name: string, metadata: any) {
  const res = await fetch(API_URL, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, metadata }),
  });

  const json = await handleResponse(res);
  return {
    image: json.data, // metadata actualizada
    message: res.statusText || 'Metadata actualizada',
  };
}

/** ========== 4. DELETE - Eliminar imagen ========== **/
export async function deleteImage(name: string) {
  const res = await fetch(API_URL, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  });

  const json = await handleResponse(res);
  return {
    success: json.data === true,
    message: res.statusText || 'Imagen eliminada',
  };
}
