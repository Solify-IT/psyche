import React from 'react';
import renderer from 'react-test-renderer';
import Patient from 'src/interfaces/patient';
import PatientInfo from 'src/components/patientInfo';
import { BrowserRouter } from 'react-router-dom';
import CornerFab from 'src/components/cornerFab';
import Enzyme, { mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { Button } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });

const patient : Patient = {
  id: 1,
  startDate: new Date(),
  name: 'Carlos',
  middleName: 'Roberto',
  lastName: 'Del Rio',
  type: 'Joven',
  age: 22,
  gender: 'Hombre',
  telephone: '2126427',
  address: 'Temp',
  birthPlace: 'test',
  birthDate: new Date(),
  postalCode: '832032',
  forms: [
    {
      id: 1,
      name: 'Encuesta socioeconomica',
      createdDate: new Date(),
    },
    {
      id: 2,
      name: 'Relatoria',
      createdDate: new Date(),
    },
    {
      id: 3,
      name: 'Encuesta socioeconomica',
      createdDate: new Date(),
    },
  ],
};

describe('Patient info', () => {
  test('snapshot renders', () => {
    const component = renderer.create(
      <BrowserRouter>
        <PatientInfo patient={patient} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('renders patient info', () => {
    const wrapper = mount(
      <BrowserRouter>
        <PatientInfo patient={patient} />
      </BrowserRouter>,
    );
    expect(wrapper.find('PatientGeneralInfo')).toHaveLength(1);
  });

  test('renders patient file sections', () => {
    const wrapper = mount(
      <BrowserRouter>
        <PatientInfo patient={patient} />
      </BrowserRouter>,
    );
    expect(wrapper.find('FormSection')).toHaveLength(2);
  });

  test('renders fab button', () => {
    const wrapper = mount(
      <BrowserRouter>
        <PatientInfo patient={patient} />
      </BrowserRouter>,
    );
    expect(wrapper.find(CornerFab)).toHaveLength(1);
  });

  test('renders view and modify button per form', () => {
    const wrapper = mount(
      <BrowserRouter>
        <PatientInfo patient={patient} />
      </BrowserRouter>,
    );
    expect(wrapper.find(Button)).toHaveLength(3 * 2);
  });
});
