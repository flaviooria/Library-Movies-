import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import { UserProvider } from './providers/userprovider';

const App = () => {
  const [user, setUser] = useState({});

  return (
    <UserProvider.Provider value={{ user: user, addUser: setUser }}>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
    </UserProvider.Provider>
  );
};

export default App;
