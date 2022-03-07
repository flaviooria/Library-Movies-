import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import AppAuth from '../auth/auth';
import '../sass/home.scss';
import { UserProvider } from '../providers/userprovider';
import {
  getGeneresMovies,
  insertMovieInFavorites,
} from '../services/movies_services';
import NavBar from '../components/com_home/appbar';
import SearchBar from '../components/com_home/search_bar';

const App = AppAuth.getInstance();
const services = AppAuth.services();
const auth = services.getAuth(App);

const Card = ({ movie, user }) => {
  const handleClick = async () => {
    //Insert in db the movie list favorites of user
    const response = await insertMovieInFavorites(movie, user.uid);

    if (response) {
      new Swal({
        title: 'Pelicula Añadida',
        text: 'Tu pelicula ha sido añadidad correctamente!',
        icon: 'success',
        button: 'ok',
      });
    } else {
      new Swal({
        title: 'Pelicula no añadida',
        text: 'No se pudo añadir la pelicula,intentalo de nuevo',
        icon: 'error',
        button: 'ok',
      });
    }
  };

  const { id, title, url, vote_average, overview } = movie;
  return (
    <div className='card' id={id}>
      <img className='card-img-top poster' src={url} alt='card image cap'></img>
      <div className='card-header title'>{title}</div>
      <div className='card-body'>
        <h5 className='card-subtitle'>{overview || 'Sin descripción'}</h5>
        <p className='card-text'>Valoración: {vote_average}</p>
        <button onClick={handleClick} className='btn btn-primary'>
          Añadir a favoritos
        </button>
      </div>
    </div>
  );
};

const ContainerCards = ({ movies, user }) => {
  //Esta variable me servira por si de la api no tiene poster y la reemplazo con esta
  const placeholder =
    'https://paperetsdecolorets.es/wp-content/uploads/2019/10/placeholder.png';

  const url_pre_img = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

  if (Object.keys(movies).length === 0) {
    return <></>;
  }

  const { results } = movies;
  const movies_data = results;

  return (
    <div className='container-movies'>
      {movies_data.map((movie) => {
        //Make card of movie
        const { id, title, vote_average, poster_path, overview } = movie;
        let url = '';

        if (poster_path != null) {
          url = url_pre_img + poster_path;
        } else {
          url = placeholder;
        }

        const movieGenerate = { id, title, url, vote_average, overview };

        return <Card user={user} movie={movieGenerate} key={id}></Card>;
      })}
    </div>
  );
};

const Home = () => {
  const provider = useContext(UserProvider);
  const navigate = useNavigate();
  const [genres, setGenres] = useState([]);

  services.onAuthStateChanged(auth, (user) => {
    if (user) {
      provider.addUser(user);
    } else {
      navigate('/', { replace: true });
    }
  });

  //loading all genres of movies
  useEffect(async () => {
    const res = await getGeneresMovies();
    setGenres(res);
  }, []);

  if (Object.keys(genres).length !== 0) {
    return (
      <div className='container-fluid'>
        <NavBar></NavBar>
        <SearchBar filter={genres}></SearchBar>
        <ContainerCards
          user={provider.user}
          movies={provider.movies}
        ></ContainerCards>
      </div>
    );
  } else {
    return <h1>Sin data</h1>;
  }
};

export default Home;
