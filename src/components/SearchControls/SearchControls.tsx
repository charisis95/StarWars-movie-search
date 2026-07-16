import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { FormControl, MenuItem, Select } from '@mui/material';
import type { SelectChangeEvent } from '@mui/material';
import { useState } from 'react';
import type { FormEvent } from 'react';
import type { MovieOrder } from '../../models/movie';
import type { SearchControlsProps } from './SearchControls.types';
import './SearchControls.css';

export function SearchControls({
  filterText,
  order,
  onFilterChange,
  onOrderChange,
}: SearchControlsProps) {
  const [isOrderMenuOpen, setIsOrderMenuOpen] = useState(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => event.preventDefault();
  const handleOrderChange = (event: SelectChangeEvent<MovieOrder>) => {
    onOrderChange(event.target.value as MovieOrder);
  };

  return (
    <header className="search-controls">
      <div className="search-controls-heading">
        <div className="search-controls-emblem" aria-hidden="true">
          <svg viewBox="0 0 48 48" fill="none">
            <path d="M24 4 29.1 18.9 44 24l-14.9 5.1L24 44l-5.1-14.9L4 24l14.9-5.1L24 4Z" stroke="currentColor" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="4.5" fill="currentColor" />
          </svg>
        </div>
        <div>
          <p className="search-controls-eyebrow">The complete film collection</p>
          <h1>Star Wars <span>Saga</span></h1>
        </div>
      </div>
      <div className="search-controls-toolbar">
        <FormControl className="search-controls-order" size="small">
          <Select<MovieOrder>
            value={order}
            open={isOrderMenuOpen}
            onChange={handleOrderChange}
            onClose={() => setIsOrderMenuOpen(false)}
            onOpen={() => setIsOrderMenuOpen(true)}
            IconComponent={
              isOrderMenuOpen ? KeyboardArrowUpRoundedIcon : KeyboardArrowDownRoundedIcon
            }
            inputProps={{ 'aria-label': 'Sort films' }}
            MenuProps={{ className: 'search-controls-order-menu' }}
          >
            <MenuItem value="episode">Order by Episode</MenuItem>
            <MenuItem value="release_date">Order by Year</MenuItem>
          </Select>
        </FormControl>
        <form className="search-controls-form" role="search" onSubmit={handleSubmit}>
          <svg
            className="search-controls-icon"
            width="17"
            height="16"
            fill="none"
            viewBox="0 0 17 16"
            aria-hidden="true"
          >
            <path
              d="M7.667 12.667A5.333 5.333 0 107.667 2a5.333 5.333 0 000 10.667zM14.334 14l-2.9-2.9"
              stroke="currentColor"
              strokeWidth="1.333"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <label className="visually-hidden" htmlFor="film-search">Search films by title</label>
          <input
            id="film-search"
            className="search-controls-input"
            placeholder="Search by title"
            type="search"
            value={filterText}
            onChange={(event) => onFilterChange(event.target.value)}
          />
          {filterText && (
            <button
              className="search-controls-reset"
              type="button"
              aria-label="Clear search"
              onClick={() => onFilterChange('')}
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </form>
      </div>
    </header>
  );
}
