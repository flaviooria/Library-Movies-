import { useState, useEffect } from 'react';
import { getMoviesByFilterGenre } from '../services/movies_services';

const useGenreMovie = ({ id_genre }) => {
  const [movies, setMovies] = useState([]);

  useEffect(async () => {
    const res = await getMoviesByFilterGenre(id_genre);
    setMovies(res);
  }, [id_genre]);
  return movies;
};

export default useGenreMovie;
