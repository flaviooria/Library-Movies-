import { createContext } from 'react';

const UserProvider = createContext({
  user: {},
  addUser: (user) => {},
  movies: {},
  addMovies: () => {},
});

export { UserProvider };
