export interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}

export interface FilmsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Movie[];
}

export interface MoviePoster {
  posterUrl: string | null;
}

export interface TmdbMovieResult {
  id: number;
  poster_path: string | null;
}

export interface TmdbSearchResponse {
  results: TmdbMovieResult[];
}

export type MovieOrder = 'episode' | 'release_date';
