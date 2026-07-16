# Star Wars Saga

A responsive film browser for the main Star Wars saga. Film data comes from SWAPI and poster images come from TMDB.

## Live Demo

[View the live application](https://star-wars-movie-search.vercel.app/)

## Features

- Search films by title
- Sort by episode or release date
- View opening crawls, credits, release dates, and posters
- URL-based film selection
- Responsive desktop, tablet, and mobile layouts
- Loading, error, empty, and not-found states

## Technology

- React 18 and TypeScript
- Vite
- React Router
- Material UI
- Vitest and Testing Library

## Setup

```bash
npm install
```

Copy `.env.example` to `.env.local` and add a TMDB API key:

```env
VITE_TMDB_API_KEY=your_tmdb_api_key
```

Values prefixed with `VITE_` are included in the browser bundle. Use a backend proxy if the key must remain private in production.

## Commands

```bash
npm run dev
npm run build
npm run test
npm run lint
npm run typecheck
```

## Structure

```text
src/
  components/  Reusable interface components
  hooks/       Data-loading hooks
  layouts/     Shared page layouts
  models/      API and application types
  routes/      Route configuration
  screens/     Route-level screens
  services/    SWAPI and TMDB requests
  utils/       Shared formatting and error helpers
```

This is a public film browser and has no user accounts or roles.
