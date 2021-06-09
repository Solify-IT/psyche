import React from 'react';

import 'src/App.css';
import { useParams } from 'react-router-dom';
import PromiseLoader from 'src/utils/promiseLoader';
import Form from 'src/interfaces/form';
import { getForms } from 'src/api/forms';
import Forms from 'src/components/Forms/ListForm/Forms';

function PatientAvailableForms() {
  const { id } : any = useParams();
  const mPromise = getForms();
  const content = PromiseLoader<Form[]>(
    mPromise,
    (forms) => <Forms forms={forms} recordId={id} />,
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

export default PatientAvailableForms;
