import { useEffect, useState } from 'react';
import type { MoviePoster } from '../models/movie';
import { getMoviePoster } from '../services/movieService';
import { getErrorMessage } from '../utils/getErrorMessage';

export interface MoviePosterState {
  poster: MoviePoster | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useMoviePoster(title?: string, releaseDate?: string): MoviePosterState {
  const [poster, setPoster] = useState<MoviePoster | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const abortController = new AbortController();

    if (!title || !releaseDate) {
      setPoster(null);
      setErrorMessage(null);
      return () => abortController.abort();
    }

    if (!apiKey) {
      setPoster(null);
      setErrorMessage('Add VITE_TMDB_API_KEY to your environment to load posters.');
      return () => abortController.abort();
    }

    const requestedTitle = title;
    const requestedReleaseYear = releaseDate.slice(0, 4);
    const requestedApiKey = apiKey;

    async function loadPoster() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        setPoster(null);
        setPoster(
          await getMoviePoster(
            requestedTitle,
            requestedReleaseYear,
            requestedApiKey,
            abortController.signal,
          ),
        );
      } catch (error) {
        if (!abortController.signal.aborted) {
          setErrorMessage(getErrorMessage(error, 'The film poster could not be loaded.'));
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadPoster();
    return () => abortController.abort();
  }, [apiKey, releaseDate, title]);

  return { poster, isLoading, errorMessage };
}
