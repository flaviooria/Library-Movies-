import Swal from 'sweetalert2';
import {
  insertMovieInFavorites,
  deleteMovieFromList,
} from '../../services/movies_services';

const Card = ({ movie, provider, canAdd, id_movie }) => {
  const handleClick = async (action) => {
    const uid = provider.user.uid;

    if (action === 'add') {
      //Insert in db the movie list favorites of user
      const response = await insertMovieInFavorites(movie, uid);

      if (response) {
        new Swal({
          title: 'Pelicula Añadida',
          text: 'Tu pelicula ha sido añadidad correctamente!',
          icon: 'success',
        });
      } else {
        new Swal({
          title: 'Pelicula no añadida',
          text: 'No se pudo añadir la pelicula,intentalo de nuevo',
          icon: 'error',
        });
      }
    } else {
      const response = await deleteMovieFromList(uid, id_movie);

      if (response == 200) {
        new Swal({
          title: 'Pelicula Eliminada',
          text: 'Tu pelicula se elimino correctamente!',
          icon: 'success',
        });
      } else {
        new Swal({
          title: 'Pelicula no eliminada',
          text: 'Tu pelicula no se pudo eliminar!',
          icon: 'error',
        });
      }
    }
  };

  const { id, title, url, vote_average, overview } = movie;
  return (
    <div className='card' id={id}>
      <img className='card-img-top poster' src={url} alt='card image cap'></img>
      <div className='card-header title'>{title}</div>
      <div className='card-body'>
        <h5 className='card-subtitle'>{overview || 'Sin descripción'}</h5>
        <p className='card-text'>Valoración: {vote_average}</p>
        {canAdd ? (
          <button
            onClick={() => handleClick('add')}
            className='btn btn-primary'
          >
            Añadir a favoritos
          </button>
        ) : (
          <button
            onClick={() => handleClick('remove')}
            className='btn btn-danger'
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
};

export default Card;
