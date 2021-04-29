import { Form } from 'domain/model';

const formFixture : Form = {
  name: 'Nueva encuesta',
  type: 'Jovenes',
  fields: [
    {
      label: 'Campo nuevo',
      type: 'text',
      options: [{
        label: 'Etiqueta',
      }],
    },
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
