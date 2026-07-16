import { useEffect, useState } from 'react';
import { getMoviePoster } from '../services/movieService';
import { getErrorMessage } from '../utils/getErrorMessage';

interface MoviePosterState {
  posterUrl: string | null;
  isLoading: boolean;
  errorMessage: string | null;
}

export function useMoviePoster(title?: string, releaseDate?: string): MoviePosterState {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;

  useEffect(() => {
    const abortController = new AbortController();

    if (!title || !releaseDate) {
      setPosterUrl(null);
      setErrorMessage(null);
      return () => abortController.abort();
    }

    if (!apiKey) {
      setPosterUrl(null);
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
        setPosterUrl(null);
        setPosterUrl(
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

  return { posterUrl, isLoading, errorMessage };
}
