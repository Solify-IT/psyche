import React from 'react';

import 'src/App.css';
import { useParams } from 'react-router-dom';
import PromiseLoader from 'src/utils/promiseLoader';
import Form from 'src/interfaces/form';
import GenerateForm from 'src/components/Forms/NewPatientForm/generateForm';
import { getForm } from 'src/api/forms';

function NewPatientForm() {
  const { id, formId } : any = useParams();
  const mPromise = getForm;
  const content = PromiseLoader<Form>(
    () => mPromise(formId),
    (form) => <GenerateForm data={form} id={id} />,

  );
  return content;
}

export default NewPatientForm;
