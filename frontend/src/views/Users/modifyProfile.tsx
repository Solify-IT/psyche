import React from 'react';
import PatientArea from 'src/interfaces/patientArea';
import PromiseLoader from 'src/utils/promiseLoader';
import EditProfile from 'src/components/Users/editProfile';
import { getUserAreas } from 'src/api/user';

type PsychProfileResponse = {
  patientAreas: PatientArea[],
  workSchedule: string,
};

function ModifyProfile() {
  const mPromise = getUserAreas;
  const content = PromiseLoader<PsychProfileResponse>(
    mPromise,
    (response) => {
      const { patientAreas, workSchedule } = response;
      return <EditProfile areas={patientAreas} workSchedule={workSchedule} />;
    },
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
