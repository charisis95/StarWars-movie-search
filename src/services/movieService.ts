import type { FilmsResponse, Movie, MoviePoster, TmdbSearchResponse } from '../models/movie';

const filmsEndpoint = 'https://swapi.dev/api/films/?format=json';
const tmdbSearchEndpoint = 'https://api.themoviedb.org/3/search/movie';
const tmdbImageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const tmdbTitleAliases: Record<string, string> = {
  'A New Hope': 'Star Wars',
};

async function getJson<T>(url: URL | string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(url, { signal });

  if (!response.ok) {
    throw new Error(`The request failed with status ${response.status}.`);
  }

  return response.json() as Promise<T>;
}

export async function getMovies(signal?: AbortSignal): Promise<Movie[]> {
  const data = await getJson<FilmsResponse>(filmsEndpoint, signal);
  return data.results;
}

export async function getMoviePoster(
  title: string,
  releaseYear: string,
  apiKey: string,
  signal?: AbortSignal,
): Promise<MoviePoster> {
  const url = new URL(tmdbSearchEndpoint);
  url.searchParams.set('query', tmdbTitleAliases[title] ?? title);
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('language', 'en-US');
  url.searchParams.set('primary_release_year', releaseYear);

  const searchResponse = await getJson<TmdbSearchResponse>(url, signal);
  const movieWithPoster = searchResponse.results.find((movie) => movie.poster_path);

  if (!movieWithPoster?.poster_path) {
    throw new Error('A poster could not be found.');
  }

  return { posterUrl: `${tmdbImageBaseUrl}${movieWithPoster.poster_path}` };
}
