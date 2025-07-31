import { ImageMetadata } from '../../types/image';

export const getFiles = async (page = 1, limit = 20, search = '') => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
  });

  const res = await fetch(`/api/admin/media?${params}`, {
    method: 'GET',
  });

  const resjson = await res.json();

  if (!res.ok) {
    console.log(resjson);
    return [];
  }

  const { data } = resjson;

  return data as ImageMetadata[];
};
