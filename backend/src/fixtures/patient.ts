import { Patient } from 'domain/model';

const patientFixture : Patient = {
  name: 'Carlos',
  lastName: 'Del Rio',
  type: 'Jovenes',
  gender: 'Hombre',
  telephone: '2126427',
  address: 'Temp',
  birthPlace: 'test',
  birthDate: new Date(),
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
  userId: 1,

};

export default patientFixture;
