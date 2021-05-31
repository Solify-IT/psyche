import { authenticationService } from 'src/api/authenticationService';

export const withRole = (roles: string[]) => (component: JSX.Element) => {
  const { role } = authenticationService.currentUserValue.user;
  if (roles.includes(role)) {
    return component;
  }

  return null;
};

export default withRole;
