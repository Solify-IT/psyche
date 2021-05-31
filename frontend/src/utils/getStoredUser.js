import { INITIAL_STATE } from './useAuth';

const getStoredUser = () => {
  const user = window.localStorage.getItem('currentUser');
  if (user) {
    return JSON.parse(user);
  }
  return INITIAL_STATE;
};

export default getStoredUser;
