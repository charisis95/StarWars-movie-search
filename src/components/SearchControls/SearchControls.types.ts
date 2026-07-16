import type { MovieOrder } from '../../models/movie';

export interface SearchControlsProps {
  filterText: string;
  order: MovieOrder;
  onFilterChange: (filterText: string) => void;
  onOrderChange: (order: MovieOrder) => void;
}
