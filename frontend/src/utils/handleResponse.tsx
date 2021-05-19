import { useHistory } from 'react-router';
import { logout } from '../api/authenticationService';

export default function handleResponse(response:any) {
  if (response.request.status !== 200) {
    if ([401, 403].indexOf(response.request.status) !== -1) {
      logout();
      const history = useHistory();
      history.push('/login');
      alert('¡Tu sesión ha caducado 😔!');
    }
    const error = response;
    return Promise.reject(error);
  }
  return response.data;
}
