/*
 * SERVICES
 **/

//GET movies favorites by user
async function getMoviesFavorites(uid) {
  const data = await fetch(
    `https://playlist-creator-46da6-default-rtdb.europe-west1.firebasedatabase.app/users/${uid}/movies_list.json`
  );

  return data.json();
}

//GET movies filter by genre
async function getMoviesByFilterGenre(id_genre) {
  const data = await fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=06069c8357d1fbce87e5f4ca6c1cf844&with_genres=${id_genre}&include_adult=false&language=es-Es`
  );

  return data.json();
}

//GET list option by genres

async function getGeneresMovies() {
  const data = await fetch(
    'https://api.themoviedb.org/3/genre/movie/list?api_key=06069c8357d1fbce87e5f4ca6c1cf844&language=es-ES'
  );

  return data.json();
}

//GET movies by title
async function getMovieByTitle(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=06069c8357d1fbce87e5f4ca6c1cf844&query=${title}&language=es-ES&total_results=10`;

  const data = await fetch(url);

  return data.json();
}

//POST Movie in list of favorites
async function insertMovieInFavorites(movieObject, id_user) {
  const url = `https://playlist-creator-46da6-default-rtdb.europe-west1.firebasedatabase.app/users/${id_user}/movies_list.json`;

  const data = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(movieObject),
  });

  return data.json();
}

//DELETE, delete a movie from list in bd
async function deleteMovieFromList(id_user, id_movie) {
  const url = `https://playlist-creator-46da6-default-rtdb.europe-west1.firebasedatabase.app/users/${id_user}/movies_list/${id_movie}.json`;

  let data = await fetch(url, {
    method: 'DELETE',
  });

  return data.status;
}

export {
  getGeneresMovies,
  getMoviesByFilterGenre,
  getMovieByTitle,
  insertMovieInFavorites,
  getMoviesFavorites,
  deleteMovieFromList,
};
