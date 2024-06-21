// MovieList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieListItem from './MovieListItem';

function MovieList() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.themoviedb.org/3/movie/now_playing?api_key=f1e83908c6b47197355e7a7563b16feb')
      .then(response => {
        setMovies(response.data.results);
      })
      .catch(error => {
        console.error('Error loading movies data:', error);
      });
  }, []);

  if (movies.length === 0) {
    return (
      <div style={{ flex: 1, padding: 20 }}>
        <p>Loading, please wait...</p>
      </div>
    );
  } else {
    const movieItems = movies.map((movie, index) => <MovieListItem key={index} movie={movie} />);

    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', padding: '20px' }}>
        {movieItems}
      </div>
    );
  }
}

export default MovieList;
