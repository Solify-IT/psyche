import { authenticationService } from 'src/api/authenticationService';

export default function authHeader() {
  const currentUser = authenticationService.currentUserValue;
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  }
  console.error('Current user local data not found or invalid');
  return {};
}
