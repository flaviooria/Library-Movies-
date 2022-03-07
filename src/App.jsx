import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import { UserProvider } from './providers/userprovider';
import Favorites from './pages/favorites';
import ContainerCards from './components/com_home_favorites/container_cards';

const App = () => {
  const [user, setUser] = useState({});
  const [movies, setMovies] = useState({});
  const [moviesFavorites, setMoviesFavorites] = useState([]);

  return (
    <UserProvider.Provider
      value={{
        user: user,
        addUser: setUser,
        movies: movies,
        addMovies: setMovies,
        moviesFavorites: moviesFavorites,
        addMoviesFavorites: setMoviesFavorites,
      }}
    >
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path='/favorites' element={<Favorites />}></Route>
      </Routes>
    </UserProvider.Provider>
  );
};

export default App;
