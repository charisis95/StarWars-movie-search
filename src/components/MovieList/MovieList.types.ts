import type { Movie } from '../../models/movie';

export interface MovieListProps {
  movies: Movie[];
  selectedEpisodeId?: number;
  onMovieSelect: (movie: Movie) => void;
}
