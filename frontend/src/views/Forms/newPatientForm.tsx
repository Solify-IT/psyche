import React from 'react';

import server from 'src/utils/server';
import 'src/App.css';
import { useParams } from 'react-router-dom';
import PromiseLoader from 'src/utils/promiseLoader';
import Form from 'src/interfaces/form';
import GenerateForm from 'src/components/Forms/NewPatientForm/generateForm';

function NewPatientForm() {
  const { id, formId } : any = useParams();
  const mPromise = server.get<Form>(`/forms/${formId}`);
  const content = PromiseLoader<Form>(
    mPromise,
    (form) => <GenerateForm data={form} id={id} />,
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

export default NewPatientForm;
