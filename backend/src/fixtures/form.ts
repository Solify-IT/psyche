import { Form } from 'domain/model';

const formFixture : Form = {
  name: 'Nueva encuesta',
  fields: [
    {
      label: 'Campo nuevo',
      type: 'text',
      options: [{
        label: 'Etiqueta',
      }],
    },
  ],
};

export default formFixture;
