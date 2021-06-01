import React from 'react';

import { consultProfile } from 'src/api/user';
import { useParams } from 'react-router';

import PromiseLoader from 'src/utils/promiseLoader';
import UserProfile from 'src/components/Users/userProfile';
import User from 'src/interfaces/user';

function ConsultProfiles() {
  const mPromise = consultProfile;
  const { id } : any = useParams();

  return PromiseLoader(
    () => mPromise(id),
    (user: User) => <UserProfile user={user} />,
  );
}

export default ConsultProfiles;
