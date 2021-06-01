import React from 'react';
import { getFormField } from 'src/api/forms';

import PromiseLoader from 'src/utils/promiseLoader';
import PatientForm from 'src/interfaces/patientForm';
import UpdateExistingPatientForm from 'src/components/Forms/updateExistingPatientForm';
import { useParams } from 'react-router';

function UpdatePatientForm() {
  const { formId } : any = useParams();
  const mPromise = getFormField;
  return PromiseLoader(
    () => mPromise(formId),
    (form: PatientForm) => <UpdateExistingPatientForm form={form} formId={formId} />,
  );
}

export default UpdatePatientForm;
