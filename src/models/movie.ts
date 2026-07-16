export interface Movie {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
}

export interface FilmsResponse {
  results: Movie[];
}

export interface TmdbMovieResult {
  poster_path: string | null;
}

export interface TmdbSearchResponse {
  results: TmdbMovieResult[];
}

export type MovieOrder = 'episode' | 'release_date';
