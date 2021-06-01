import React from 'react';
import { authenticationService } from 'src/api/authenticationService';
import { consultProfile } from 'src/api/user';
import UpdateUserForm from 'src/components/Users/updateUserForm';
import User from 'src/interfaces/user';
import PromiseLoader from 'src/utils/promiseLoader';

function UpdateUser() {
  const userId = authenticationService.currentUserValue.user.id;
  const mPromise = consultProfile;
  return PromiseLoader(
    () => mPromise(userId),
    (user: User) => <UpdateUserForm user={user} userId={userId} />,
  );
}
export default UpdateUser;
