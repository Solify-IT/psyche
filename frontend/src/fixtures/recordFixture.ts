import Patient from 'src/interfaces';
import Record from 'src/interfaces/record';
import patientFixture from './patientFixture';

const patients : Patient[] = [patientFixture, {
  id: 2,
  startDate: new Date(),
  name: 'Carlos',
  lastName: 'Del Rio',
  type: 'Joven',
  gender: 'Hombre',
  telephone: '2126427',
  address: 'Temp',
  birthPlace: 'test',
  birthDate: new Date(),
  postalCode: 832032,
}];

const recordFixture : Record = {
  id: 1,
  patients,
  active: true,
  startDate: new Date(),
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
export default recordFixture;
