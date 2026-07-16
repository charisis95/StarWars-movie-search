import type { MovieListProps } from './MovieList.types';
import { formatReleaseDate } from '../../utils/formatReleaseDate';
import './MovieList.css';

export function MovieList({ movies, selectedEpisodeId, onMovieSelect }: MovieListProps) {
  return (
    <div className="movie-list-card" aria-label="Star Wars films">
      {movies.map((movie) => {
        const isSelected = movie.episode_id === selectedEpisodeId;

        return (
          <button
            className={`movie-list-row${isSelected ? ' movie-list-row-active' : ''}`}
            key={movie.episode_id}
            type="button"
            aria-pressed={isSelected}
            onClick={() => onMovieSelect(movie)}
          >
            <span className="movie-list-episode">Episode {movie.episode_id}</span>
            <span className="movie-list-title">{movie.title}</span>
            <time className="movie-list-release" dateTime={movie.release_date}>
              {formatReleaseDate(movie.release_date)}
            </time>
          </button>
        );
      })}
    </div>
  );
}
