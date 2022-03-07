import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { singOutUser } from '../../auth/services_oauth';

const NavBar = () => {
  const navigate = useNavigate();

  const singOut = async () => {
    await singOutUser();
    navigate('/', { replace: true });
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-light bg-success'>
      <div className='container-fluid'>
        <a className='navbar-brand text-white'>Movie List Creator</a>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarNav'
          aria-controls='navbarNav'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarNav'>
          <ul className='navbar-nav'>
            <li className='nav-item'>
              <Link
                to={'/home'}
                className='nav-link active text-white'
                aria-current='page'
              >
                Buscar
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link text-white' to='/favorites'>
                Mi Biblioteca
              </Link>
            </li>

            <li className='nav-item'>
              <a className='nav-link btn-logout text-white' onClick={singOut}>
                Cerrar Sesión
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
