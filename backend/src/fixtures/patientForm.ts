import PatientForm from 'domain/model/patientForm';

const patientFormFixture : PatientForm = {
  name: 'Nueva encuesta',
  type: 'Jóvenes',
  recordId: 1,
  fields: [
    {
      label: 'Nombre',
      type: 'text',
      value: 'Carlos Alfonso',
      options: [],
    },
    {
      label: 'Edad',
      type: 'number',
      value: '22',
      options: [],

    },
  ],
};

export default patientFormFixture;
