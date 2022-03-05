import { createContext } from 'react';

const UserProvider = createContext({
  user: {},
  addUser: (user) => {},
});

export { UserProvider };
