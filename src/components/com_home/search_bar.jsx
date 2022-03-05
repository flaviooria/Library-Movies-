const DropDownGenre = () => {
  return (
    <select
      name='cars'
      id='cars'
      className='menu-genres btn btn-outline-success dropdown-toggle'
    >
      <option value='-1'>Fitrar Género</option>
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

const SearchBar = () => {
  return (
    <section className='container-fluid mt-5 search-bar mb-5'>
      <div className='lead mb-3'>
        Busca todo lo que quieras y crea tu lista de peliculas favoritas !!!
      </div>
      <div className='container-search'>
        <DropDownGenre></DropDownGenre>
        <FormSearch></FormSearch>
      </div>
    </section>
  );
};

export default SearchBar;
