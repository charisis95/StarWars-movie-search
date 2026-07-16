import type { Movie, MovieOrder } from '../../models/movie';

export interface SagaViewState {
  filteredMovies: Movie[];
  selectedMovie?: Movie;
  selectedOrder: MovieOrder;
  filterText: string;
}
