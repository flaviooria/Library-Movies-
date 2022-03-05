import React, { useContext, useState } from 'react';
import '../sass/styles.scss';
import '../sass/spinner.scss';
import {
  singInUser,
  singUpUser,
  singInWithGoogleProvider,
} from '../auth/services_oauth';
import { UserProvider } from '../providers/userprovider';
import { useNavigate } from 'react-router-dom';
import Buttons from '../components/com_login/buttons';

const suffix = 'home';

const Inputs = ({ handleCredentials, isRegister }) => {
  if (isRegister) {
    return (
      <>
        <label htmlFor='name'>Nombre</label>
        <input
          id='name'
          type='text'
          placeholder='usuario'
          onChange={handleCredentials}
          required
        />
        <label htmlFor='email'>Correo Electronico</label>
        <input
          id='email'
          type='email'
          placeholder='usuario@gmail.com'
          onChange={handleCredentials}
          required
        />
        <label htmlFor='password'>Contraseña</label>
        <input
          id='password'
          type='password'
          placeholder='contraseña'
          onChange={handleCredentials}
          required
        />
      </>
    );
  } else {
    return (
      <>
        <label htmlFor='email'>Correo Electronico</label>
        <input
          id='email'
          type='email'
          placeholder='usuario@gmail.com'
          onChange={handleCredentials}
          required
        />
        <label htmlFor='password'>Contraseña</label>
        <input
          id='password'
          type='password'
          placeholder='contraseña'
          onChange={handleCredentials}
          required
        />
      </>
    );
  }
};

const FormAuth = () => {
  const provider = useContext(UserProvider);
  let navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [isRegister, setIsRegister] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const [hasError, setHasError] = useState(false);

  const authAccess = async (e) => {
    e.preventDefault();
    /**
     * Functions for reset values by default to load the form
     */

    const form = e.target.closest('form');
    const resetForm = () => form.reset();
    const resetCredentials = () =>
      setCredentials({
        name: '',
        email: '',
        password: '',
      });

    if (credentials.email !== '' && credentials.password !== '') {
      if (!isRegister) {
        try {
          const response = await singInUser(
            credentials.email,
            credentials.password
          );

          if (response.user) {
            provider.addUser(response.user);
            await renderSpinner();
            resetForm();
            resetCredentials();
            navigate('/home');
          }
        } catch (error) {
          await renderSpinner();
          setHasError(!hasError);
          setTimeout(() => {
            resetForm();
            resetCredentials();
            setHasError(false);
          }, 1000);
        }
      } else {
        try {
          const response = await singUpUser(
            credentials.name,
            credentials.email,
            credentials.password
          );

          if (response.user) {
            console.log('registrado');
            provider.addUser(response.user);
            await renderSpinner();
            resetForm();
            resetCredentials();
            navigate('/home');
          }
        } catch (error) {
          await renderSpinner();
          setHasError(!hasError);
          setTimeout(() => {
            resetForm();
            resetCredentials();
            setHasError(false);
          }, 1000);
        }
      }
    }
  };

  const authWihtGoogle = async () => {
    const user = await singInWithGoogleProvider();
    if (user) {
      navigate('/home');
    }
  };

  const renderSpinner = async () => {
    await spinner();
  };

  const spinner = () => {
    return new Promise((res, rej) => {
      setShowSpinner(!showSpinner);
      setTimeout(() => {
        res(setShowSpinner(false));
      }, 2500);
    });
  };

  const handleCredentials = (e) => {
    if (e.target.id === 'email') {
      setCredentials({ ...credentials, email: e.target.value });
    } else if (e.target.id === 'password') {
      setCredentials({ ...credentials, password: e.target.value });
    } else if (e.target.id === 'name') {
      setCredentials({ ...credentials, name: e.target.value });
    }
  };

  const handleClickRegister = () => {
    setIsRegister(!isRegister);
  };

  return (
    <section className='content-form'>
      <form action='' className='form' autoComplete='off'>
        <Inputs
          handleCredentials={handleCredentials}
          isRegister={isRegister}
        ></Inputs>
        <Buttons
          authAccess={authAccess}
          authWihtGoogle={authWihtGoogle}
          handleClickRegister={handleClickRegister}
          hasError={hasError}
          isRegister={isRegister}
          showSpinner={showSpinner}
        />
      </form>
    </section>
  );
};

const Login = () => {
  return (
    <>
      <div className='login-background'>
        <div className={'container-fluid ' + suffix}>
          <section className='content-description'>
            <h2 className='display-1'>Bienvenido a Movie List Creator</h2>
            <p className='lead'>Inicia Sesión o Registrate para acceder.</p>
          </section>
          <FormAuth></FormAuth>
        </div>
      </div>
    </>
  );
};

export default Login;
