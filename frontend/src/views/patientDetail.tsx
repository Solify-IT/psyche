import React from 'react';

import server from 'src/utils/server';
import '../App.css';
import Patient from 'src/interfaces';
import { useParams } from 'react-router-dom';
import PromiseLoader from 'src/utils/promiseLoader';
import PatientInfo from 'src/components/patientInfo';

function PatientDetail() {
  const { id } : any = useParams();
  const mPromise = server.get<Patient>(`/patients/${id}`);
  const content = PromiseLoader<Patient>(
    mPromise,
    (patient) => <PatientInfo patient={patient} />,
    (error) => {
      switch (error.response?.status) {
        case 404:
          return <h2>No se encontró al paciente</h2>;
        default:
          return <h2>Ocurrió un error de conexión.</h2>;
      }
    },
  );
  return content;
}

export default PatientDetail;
