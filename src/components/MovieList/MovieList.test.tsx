import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { Movie } from '../../models/movie';
import { MovieList } from './MovieList';

const movie: Movie = {
  title: 'A New Hope',
  episode_id: 4,
  opening_crawl: 'It is a period of civil war.',
  director: 'George Lucas',
  producer: 'Gary Kurtz',
  release_date: '1977-05-25',
};

describe('MovieList', () => {
  it('selects a film with an accessible button', async () => {
    const user = userEvent.setup();
    const onMovieSelect = vi.fn();

    render(<MovieList movies={[movie]} onMovieSelect={onMovieSelect} />);
    await user.click(screen.getByRole('button', { name: /a new hope/i }));

    expect(onMovieSelect).toHaveBeenCalledWith(movie);
  });
});
