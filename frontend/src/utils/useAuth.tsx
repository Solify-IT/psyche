import { useState } from 'react';

export const INITIAL_STATE = {
  username: undefined,
  name: undefined,
  email: undefined,
  role: undefined,
  areas: undefined,
  workSchedule: undefined,
  logged: false,
};

const useAuth = (initialState: any) => {
  const [currUser, setCurrUser] = useState(initialState);

  const setUser = (user: any) => {
    setCurrUser({ ...user, logged: true });
  };

  const removeUser = () => {
    setCurrUser(INITIAL_STATE);
  };

  return { currUser, setUser, removeUser };
};

export default useAuth;
