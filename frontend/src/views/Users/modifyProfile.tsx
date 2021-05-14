import React from 'react';
import PatientArea from 'src/interfaces/patientArea';
import PromiseLoader from 'src/utils/promiseLoader';
import EditProfile from 'src/components/Users/editProfile';
import { getUserAreas } from 'src/api/user';

function ModifyProfile() {
  const mPromise = getUserAreas();
  const content = PromiseLoader<PatientArea[]>(
    mPromise,
    (areas) => <EditProfile areas={areas} />,
    (error) => {
      switch (error.response?.status) {
        case 404:
          return <h2>No se encontró el expediente</h2>;
        default:
          return <h2>Ocurrió un error de conexión.</h2>;
      }
    },
  );
  return content;
}
export default ModifyProfile;
