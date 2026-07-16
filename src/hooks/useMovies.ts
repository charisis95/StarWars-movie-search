import { useEffect, useState } from 'react';
import type { Movie } from '../models/movie';
import { getMovies } from '../services/movieService';
import { getErrorMessage } from '../utils/getErrorMessage';

interface MoviesState {
  movies: Movie[];
  isLoading: boolean;
  errorMessage: string | null;
}

export function useMovies(): MoviesState {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const abortController = new AbortController();

    async function loadMovies() {
      try {
        setIsLoading(true);
        setErrorMessage(null);
        setMovies(await getMovies(abortController.signal));
      } catch (error) {
        if (!abortController.signal.aborted) {
          setErrorMessage(getErrorMessage(error, 'Something went wrong while loading the films.'));
        }
      } finally {
        if (!abortController.signal.aborted) {
          setIsLoading(false);
        }
      }
    }

    void loadMovies();
    return () => abortController.abort();
  }, []);

  return { movies, isLoading, errorMessage };
}
