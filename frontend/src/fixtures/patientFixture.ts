import Patient from 'src/interfaces';

const patientFixture : Patient = {
  id: 1,
  startDate: new Date(),
  name: 'Carlos',
  lastName: 'Del Rio',
  type: 'Joven',
  gender: 'Hombre',
  telephone: '2126427',
  address: 'Temp',
  birthPlace: 'test',
  birthDate: '',
  postalCode: 832032,
  motive: 'Abuso',
  legalProceeding: true,
  status: true,
  abuseType: 'Sexual',
  abuseFirstTime: '10',
  abuseAttempts: '5',
  abuseMotive: 'Nomal',
  recordId: 1,
  users: [],
};
export default patientFixture;
