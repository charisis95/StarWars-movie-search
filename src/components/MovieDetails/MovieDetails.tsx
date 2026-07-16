import { useMoviePoster } from '../../hooks/useMoviePoster';
import { formatReleaseDate } from '../../utils/formatReleaseDate';
import { LoadingIndicator } from '../LoadingIndicator/LoadingIndicator';
import type { MovieDetailsProps } from './MovieDetails.types';
import './MovieDetails.css';

export function MovieDetails({ movie }: MovieDetailsProps) {
  const { poster, isLoading, errorMessage } = useMoviePoster(movie.title, movie.release_date);
  const posterUrl = poster?.posterUrl ?? null;

  return (
    <article className="movie-details">
      <div className="movie-details-heading">
        <p>Episode {movie.episode_id}</p>
        <h2>{movie.title}</h2>
        <time dateTime={movie.release_date}>{formatReleaseDate(movie.release_date)}</time>
      </div>
      <div className="movie-details-content">
        <div className="movie-details-poster-area">
          {isLoading && <LoadingIndicator compact label={`Loading poster for ${movie.title}`} />}
          {!isLoading && posterUrl && (
            <img className="movie-details-poster" src={posterUrl} alt={`${movie.title} poster`} />
          )}
          {!isLoading && !posterUrl && (
            <div className="movie-details-poster-fallback" aria-label="Poster unavailable">
              <span>Poster unavailable</span>
            </div>
          )}
        </div>
        <div className="movie-details-copy">
          <p className="movie-details-label">Opening crawl</p>
          <p className="movie-details-crawl">{movie.opening_crawl}</p>
          <dl className="movie-details-credits">
            <div>
              <dt>Director</dt>
              <dd>{movie.director}</dd>
            </div>
            <div>
              <dt>Producer</dt>
              <dd>{movie.producer}</dd>
            </div>
          </dl>
          {errorMessage && <p className="movie-details-poster-note">{errorMessage}</p>}
        </div>
      </div>
    </article>
  );
}
