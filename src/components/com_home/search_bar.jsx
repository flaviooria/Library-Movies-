import useGenreMovie from '../../hooks/genres_movies_hooks';

const DropDownGenre = ({ filter }) => {
  const { genres } = filter;

  const handleChange = (e) => {
    console.log(e.target);
    console.log('cambio');
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
  return (
    <form className='form-search' autoComplete='off'>
      <input
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
  return (
    <section className='container-fluid mt-5 search-bar mb-5'>
      <div className='lead mb-3'>
        Busca todo lo que quieras y crea tu lista de peliculas favoritas !!!
      </div>
      <div className='container-search'>
        <DropDownGenre filter={filter}></DropDownGenre>
        <FormSearch></FormSearch>
      </div>
    </section>
  );
};

export default SearchBar;
