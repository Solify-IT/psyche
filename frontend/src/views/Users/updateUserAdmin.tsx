import React from 'react';
import { useParams } from 'react-router';
import { getUser } from 'src/api/user';
import UpdateUserAdminForm from 'src/components/Users/updateUserAdminForm';
import User from 'src/interfaces/user';
import PromiseLoader from 'src/utils/promiseLoader';

function UpdateUserAdmin() {
  const { id } : any = useParams();
  const mPromise = getUser;
  return PromiseLoader(
    () => mPromise(id),
    (user: User) => <UpdateUserAdminForm user={user} userId={id} />,
  );
}
export default UpdateUserAdmin;
