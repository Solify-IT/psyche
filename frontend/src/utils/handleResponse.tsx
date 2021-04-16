import { logout } from '../api/authenticationService';

export default function handleResponse(response:any) {
  if (response.request.status !== 200) {
    if ([401, 403].indexOf(response.request.status) !== -1) {
      logout();
      window.location.replace('/login');
      // alert('¡Tu sesión ha caducado 😔!');
    }
    const error = response;
    return Promise.reject(error);
  }
  return response.data;
}
