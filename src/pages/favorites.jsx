import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProvider } from '../providers/userprovider';
import { getMoviesFavorites } from '../services/movies_services';
import AppAuth from '../auth/auth';
import NavBar from '../components/com_home/appbar';
import Card from '../components/com_home_favorites/card';
import '../sass/home.scss';

const App = AppAuth.getInstance();
const services = AppAuth.services();
const auth = services.getAuth(App);

const Favorites = () => {
  const provider = useContext(UserProvider);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [user, setUser] = useState({});

  const style = {
    margin: '30px',
  };

  services.onAuthStateChanged(auth, async (user) => {
    if (user) {
      setUser(user);
    } else {
      navigate('/', { replace: true });
    }
  });

  useEffect(async () => {
    if (Object.keys(user).length !== 0) {
      let movies_response = await getMoviesFavorites(user.uid);

      //Its movies is not null generate array of values movies
      if (movies_response) {
        movies_response = Object.entries(movies_response);
        setMovies(movies_response);
      }
    }
  }, [user]);

  if (movies.length === 0) {
    return (
      <div className='container-fluid'>
        <NavBar></NavBar>
        <div className='container-movies' style={style}>
          No hay datos
        </div>
      </div>
    );
  }

  return (
    <>
      <div className='container-fluid'>
        <NavBar></NavBar>
        <div className='container-movies' style={style}>
          {movies.map((movie) => {
            //Make card of movie
            const id_movie = movie[0];
            const { title, vote_average, url, overview } = movie[1];

            const movieGenerate = {
              id_movie,
              title,
              url,
              vote_average,
              overview,
            };

            return (
              <Card
                id_movie={id_movie}
                provider={provider}
                movie={movieGenerate}
                key={id_movie}
                canAdd={false}
              ></Card>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Favorites;
