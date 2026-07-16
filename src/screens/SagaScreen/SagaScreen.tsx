import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FeedbackMessage } from '../../components/FeedbackMessage/FeedbackMessage';
import { LoadingIndicator } from '../../components/LoadingIndicator/LoadingIndicator';
import { MovieDetails } from '../../components/MovieDetails/MovieDetails';
import { MovieList } from '../../components/MovieList/MovieList';
import { SearchControls } from '../../components/SearchControls/SearchControls';
import { useMovies } from '../../hooks/useMovies';
import type { Movie, MovieOrder } from '../../models/movie';
import './SagaScreen.css';

function sortMovies(movies: Movie[], order: MovieOrder): Movie[] {
  return [...movies].sort((firstMovie, secondMovie) => {
    if (order === 'episode') {
      return firstMovie.episode_id - secondMovie.episode_id;
    }

    return firstMovie.release_date.localeCompare(secondMovie.release_date);
  });
}

export function SagaScreen() {
  const [selectedOrder, setSelectedOrder] = useState<MovieOrder>('episode');
  const [filterText, setFilterText] = useState('');
  const { episodeId } = useParams();
  const navigate = useNavigate();
  const { movies, isLoading, errorMessage } = useMovies();
  const parsedEpisodeId = episodeId ? Number(episodeId) : undefined;
  const selectedMovie = movies.find((movie) => movie.episode_id === parsedEpisodeId);
  const normalizedFilter = filterText.trim().toLocaleLowerCase();
  const filteredMovies = sortMovies(movies, selectedOrder).filter((movie) =>
    movie.title.toLocaleLowerCase().includes(normalizedFilter),
  );

  const handleMovieSelect = (movie: Movie) => {
    navigate(`/films/${movie.episode_id}`);
  };

  return (
    <main className="saga-screen">
      <SearchControls
        filterText={filterText}
        order={selectedOrder}
        onFilterChange={setFilterText}
        onOrderChange={setSelectedOrder}
      />
      <div className="saga-screen-content">
        <section className="saga-screen-list" aria-label="Film selection">
          {isLoading && <LoadingIndicator label="Loading Star Wars films" />}
          {!isLoading && errorMessage && (
            <FeedbackMessage
              tone="error"
              title="The saga is out of range"
              message={errorMessage}
            />
          )}
          {!isLoading && !errorMessage && filteredMovies.length === 0 && (
            <FeedbackMessage
              title="No films found"
              message="No Star Wars films match your current search."
            />
          )}
          {!isLoading && !errorMessage && filteredMovies.length > 0 && (
            <MovieList
              movies={filteredMovies}
              selectedEpisodeId={selectedMovie?.episode_id}
              onMovieSelect={handleMovieSelect}
            />
          )}
        </section>
        <section className="saga-screen-details" aria-label="Film details">
          {isLoading && <LoadingIndicator label="Preparing film details" />}
          {!isLoading && !episodeId && (
            <FeedbackMessage
              title="Choose a film"
              message="Select a movie from the saga to view its opening crawl, director, and poster."
            />
          )}
          {!isLoading && episodeId && selectedMovie && <MovieDetails movie={selectedMovie} />}
          {!isLoading && episodeId && !selectedMovie && (
            <FeedbackMessage
              tone="error"
              title="Film not found"
              message="This episode is not part of the available Star Wars film collection."
            />
          )}
        </section>
      </div>
    </main>
  );
}
