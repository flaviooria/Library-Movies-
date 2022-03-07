import Card from './card';

const ContainerCards = ({ provider }) => {
  const movies = provider.movies;

  //Esta variable me servira por si de la api no tiene poster y la reemplazo con esta
  const placeholder =
    'https://paperetsdecolorets.es/wp-content/uploads/2019/10/placeholder.png';

  const url_pre_img = 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2';

  if (Object.keys(movies).length === 0 || movies.length === 0) {
    return <></>;
  }

  const { results } = movies;
  const movies_data = results;

  return (
    <div className='container-movies'>
      {movies_data.map((movie) => {
        //Make card of movie
        const { id, title, vote_average, poster_path, overview } = movie;
        let url = '';

        if (poster_path != null) {
          url = url_pre_img + poster_path;
        } else {
          url = placeholder;
        }

        const movieGenerate = { id, title, url, vote_average, overview };

        return (
          <Card
            provider={provider}
            movie={movieGenerate}
            key={id}
            canAdd={true}
          ></Card>
        );
      })}
    </div>
  );
};

export default ContainerCards;
