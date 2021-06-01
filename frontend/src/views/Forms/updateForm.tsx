import React from 'react';

import { useParams } from 'react-router';
import { getForm } from 'src/api/forms';
import UpdateExistingForm from 'src/components/Forms/updateExistingForm';
import Form from 'src/interfaces/form';

import PromiseLoader from 'src/utils/promiseLoader';

function UpdateForm() {
  const { id } : any = useParams();
  const mPromise = getForm;
  return PromiseLoader(
    () => mPromise(id),
    (form: Form) => <UpdateExistingForm form={form} formId={id} />,
  );
}

export default UpdateForm;
