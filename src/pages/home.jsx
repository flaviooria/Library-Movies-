import React, { useContext } from 'react';

import '../sass/home.scss';
import { UserProvider } from '../providers/userprovider';
import NavBar from '../components/com_home/appbar';
import SearchBar from '../components/com_home/search_bar';

const Home = () => {
  const provider = useContext(UserProvider);

  console.log(provider.user);

  return (
    <div className='container-fluid'>
      <NavBar></NavBar>
      <SearchBar></SearchBar>
    </div>
  );
};

export default Home;
