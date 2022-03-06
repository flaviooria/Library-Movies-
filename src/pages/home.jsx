import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../sass/home.scss';
import { UserProvider } from '../providers/userprovider';
import { getGeneresMovies } from '../services/movies_services';


import NavBar from '../components/com_home/appbar';
import SearchBar from '../components/com_home/search_bar';

const ContainerCards = () => {
  return <div className='container-movies'></div>;
};

const Home = () => {
  //Esta variable me servira por si de la api no tiene poster y la reemplazo con esta
  const placeholder =
    'https://paperetsdecolorets.es/wp-content/uploads/2019/10/placeholder.png';

  const provider = useContext(UserProvider);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    //here verify that user exists, is no exist tha user is redirect to login page
    const user = provider.user;
    if (Object.keys(user).length === 0) {
      console.log('not exists user');
      //navigate('/', { replace: true });
    }
  }, []);

  //loading all genres of movies
  useEffect(async () => {
    const res = await getGeneresMovies();
    setGenres(res);
  }, []);

  console.log(provider.user);

  if (Object.keys(genres).length !== 0) {
    return (
      <div className='container-fluid'>
        <NavBar></NavBar>
        <SearchBar filter={genres}></SearchBar>
      </div>
    );
  } else {
    return <h1>Sin data</h1>;
  }
};

export default Home;
