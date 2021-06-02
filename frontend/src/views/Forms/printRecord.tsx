import React, { useState, useEffect } from 'react';
import {
  Grid,
  TextField,
}
  from '@material-ui/core';
import { listFormsWithRecordId } from 'src/api/forms';
import { useParams } from 'react-router';
// import PatientFormField from 'src/interfaces/patientFormField';
import './print.css';
import Form from 'src/interfaces/form';
import Field from 'src/interfaces/field';

function PrintRecord() {
  const [forms, setForms] = useState<Form[]>([]);
  console.log(forms);
  // const history = useHistory();
  const [formInformation, setFormInformation] = useState({
    id: 1,
    name: 'string',
    startDate: 'string',
    fields: Array<Field>(),
    type: 'string',
  });
  console.log(formInformation);
  const { recordId } : any = useParams();
  console.log(recordId);
  useEffect(() => {
    listFormsWithRecordId(recordId)
      .then((response:any) => {
        console.log(response);
        setForms(response);
        setFormInformation(response.data);
        console.log(forms);
      })
      .catch((error:any) => console.log(error));
  }, [recordId]);

  return (
    <Grid item xs={4}>
      {forms.map((form) => (
        <Grid item xs={4}>
          <TextField
            name={form.name}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default PrintRecord;
