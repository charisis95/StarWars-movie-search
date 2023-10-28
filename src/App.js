import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import List from './components/List';
import Details from './components/Details';
import Search from './components/Search';

function App() {
  const [movies, setMovies] = useState([]); //store movies data in movies
  const [poster, setPoster] = useState([]); // Store OMDB data
  const [loading, setLoading] = useState(true); // store boolean for loading
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedOrder, setSelectedOrder] = useState('episode');
  const [filterText, setFilterText] = useState(''); // State for the text input
  const apiKey = 'b9a5e69d';

  //Fetch the api and store its data
  useEffect(() => {
    axios
      .get('https://swapi.dev/api/films/?format=json')
      .then((response) => {
        const data = response.data;
        setMovies(data.results);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  //Fetch poster from omdb
  useEffect(() => {
    if (selectedMovie) {
      axios
        .get(`https://www.omdbapi.com/?t=${selectedMovie.title}&apikey=${apiKey}`)
        .then((response) => {
          const data = response.data;
          setPoster(data);
        })
        .catch((error) => {
          console.error('Error fetching OMDB data:', error);
        });
    }
  }, [selectedMovie, apiKey]);

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
  };

  //when typing this is triggered and it stores the value you typed
  const handleFilterChange = (text) => {
    setFilterText(text);
  };

  const handleOrderChange = (order) => {
    setSelectedOrder(order);
  };

  // sort movies
  const sortedMovies = [...movies].sort((a, b) => {
    if (selectedOrder === 'episode') {
      return a.episode_id - b.episode_id;
    } else if (selectedOrder === 'release_date') {
      return new Date(a.release_date) - new Date(b.release_date);
    }
    return 0;
  });
    
  // Filter the movies based on the text input
  const filteredMovies = sortedMovies.filter((movie) =>
    movie.title.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="App">
      <header className="App-header">
        <Search onOrderChange={handleOrderChange} onFilterChange={handleFilterChange} />
      </header>
      <div className="container">
        <div className="left-section">
          <List data={filteredMovies} loading={loading} onMovieSelect={handleMovieSelect} order={selectedOrder} selectedMovie={selectedMovie} />
        </div>
        <div className="right-section">
          <Details poster={poster} selectedMovie={selectedMovie} />
        </div>
      </div>
    </div>
  );
}

export default App;