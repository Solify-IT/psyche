import { Patient } from "domain/model";

const patientFixture : Patient = {
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
      name: 'Encuesta socioeconomica',
    },
    {
      name: 'Relatoria',
    },
  ],
};

export default patientFixture;
