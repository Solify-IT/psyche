import PatientForm from 'domain/model/patientForm';

const patientFormFixture : PatientForm = {
  name: 'Nueva encuesta',
  type: 'Jovenes',
  recordId: 1,
  fields: [
    {
      name: '',
      label: 'Nombre',
      type: 'text',
      value: 'Carlos Alfonso',
    },
    {
      name: '',
      label: 'Edad',
      type: 'number',
      value: '22',
    },
  ],
};

export default patientFormFixture;
