import React, { createContext } from 'react';
import useAuth, { INITIAL_STATE } from './useAuth';
import getStoredUser from './getStoredUser';

export const AuthContext = createContext({
  currUser: INITIAL_STATE,
  // eslint-disable-next-line no-undef
  setUser: (...args: any) => console.log(args),
  removeUser: (...args: any) => console.log(args),
});

const { Provider } = AuthContext;

// eslint-disable-next-line react/prop-types
const AuthProvider = ({ children } : { children: any }) => {
  const aux = getStoredUser();
  const { currUser, setUser, removeUser } = useAuth(aux.user);

  return (
    <Provider value={{ currUser, setUser, removeUser }}>{children}</Provider>
  );
};

export default AuthProvider;
