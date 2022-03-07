import { useContext, useEffect, useState } from 'react';
import useGenreMovie from '../../hooks/genres_movies_hooks';
import {
  getMoviesByFilterGenre,
  getMovieByTitle,
} from '../../services/movies_services';

import { UserProvider } from '../../providers/userprovider';

const DropDownGenre = ({ filter, idState }) => {
  const { genres } = filter;

  const handleChange = (e) => {
    const id_genre = e.target.value;
    if (id_genre !== '-1') {
      idState(id_genre);
    }
  };

  return (
    <select
      name='cars'
      id='cars'
      className='menu-genres btn btn-outline-success dropdown-toggle'
      onChange={handleChange}
    >
      <option value='-1'>Fitrar Género</option>
      {genres.map((item) => (
        <option key={item.id} value={item.id}>
          {item.name}
        </option>
      ))}
    </select>
  );
};

const FormSearch = () => {
  const [searchValue, setSearchValue] = useState('');
  const provider = useContext(UserProvider);

  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  };

  useEffect(async () => {
    if (searchValue !== '') {
      const res = await getMovieByTitle(searchValue);
      provider.addMovies(res);
    }
  }, [searchValue]);

  return (
    <form className='form-search' autoComplete='off'>
      <input
        onChange={handleChange}
        className='form-control'
        id='input_search'
        type='search'
        placeholder='Buscar...'
        aria-label='Search'
        name='query'
      />
      <a id='btn-search' className='btn btn-outline-success'>
        Buscar
      </a>
    </form>
  );
};

const SearchBar = ({ filter }) => {
  const provider = useContext(UserProvider);
  const [id, setId] = useState('');

  useEffect(async () => {
    if (id !== '') {
      const res = await getMoviesByFilterGenre(id);
      provider.addMovies(res);
    }
  }, [id]);

  return (
    <section className='container-fluid mt-5 search-bar mb-5'>
      <div className='lead mb-3'>
        Busca todo lo que quieras y crea tu lista de peliculas favoritas !!!
      </div>
      <div className='container-search'>
        <DropDownGenre filter={filter} idState={setId}></DropDownGenre>
        <FormSearch></FormSearch>
      </div>
    </section>
  );
};

export default SearchBar;
