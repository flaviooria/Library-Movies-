import Spinner from './spinner';

const Buttons = ({
  isRegister,
  authAccess,
  showSpinner,
  hasError,
  authWihtGoogle,
  handleClickRegister,
}) => {
  return (
    <div className='buttons'>
      <button
        className={!isRegister ? 'btn-login' : 'btn-register'}
        onClick={authAccess}
        type='submit'
      >
        {!isRegister ? 'Iniciar Sesión' : 'Registrarse'}
      </button>
      {showSpinner ? <Spinner /> : ''}
      {hasError ? (
        <p>Error al intentar {isRegister ? 'registrarse' : 'iniciar sesión'}</p>
      ) : (
        ''
      )}

      <p> Acceder con: </p>
      <button className='btn-google' type='submit' onClick={authWihtGoogle}>
        Google
      </button>
      {!isRegister ? (
        <p className='register'>
          Aún no estás registrado,
          <span className='register_link' onClick={handleClickRegister}>
            Registrate
          </span>
        </p>
      ) : (
        <p className='register'>
          Ya tienes una cuenta,
          <span className='register_link' onClick={handleClickRegister}>
            Inicia Sesión
          </span>
        </p>
      )}
    </div>
  );
};

export default Buttons;
