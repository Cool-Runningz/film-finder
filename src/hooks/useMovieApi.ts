import useSWR from 'swr';
import { MOVIE_API_BASE_URL } from '@/utils/constants';

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AUTH_TOKEN}`,
    },
  });

  if (!res.ok) {
    throw new Error('API error');
  }

  return res.json();
};

export function useMovieApi<T>(endpoint: string) {
  const { data, error, isLoading } = useSWR<T>(
    `${MOVIE_API_BASE_URL}${endpoint}`,
    fetcher
  );
  return { data, error, isLoading };
}