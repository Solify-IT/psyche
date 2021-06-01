import React from 'react';
import PromiseLoader from 'src/utils/promiseLoader';
import Users from 'src/interfaces/Users';
import UsersTable from 'src/components/Users/usersTable';
import { getUsers } from 'src/api/user';

function ViewUsers() {
  const mPromise = getUsers;
  return PromiseLoader(
    mPromise,
    (users: Users[]) => <UsersTable initialUsers={users} />,
  );
}

export default ViewUsers;
