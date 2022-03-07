//React
import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
//Utils app
import AppAuth from '../auth/auth';
import '../sass/home.scss';
import { UserProvider } from '../providers/userprovider';
import { getGeneresMovies } from '../services/movies_services';
//Components
import ContainerCards from '../components/com_home_favorites/container_cards';
import NavBar from '../components/com_home/appbar';
import SearchBar from '../components/com_home/search_bar';

const App = AppAuth.getInstance();
const services = AppAuth.services();
const auth = services.getAuth(App);

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
        <ContainerCards provider={provider} route={'/home'} />
      </div>
    );
  } else {
    return <h1>Sin data</h1>;
  }
};

export default Home;
