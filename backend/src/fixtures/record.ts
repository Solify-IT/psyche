import { Patient } from 'domain/model';
import Record from 'domain/model/record';
import patientFixture from './patient';

const patients : Patient[] = [patientFixture, patientFixture];
const recordFixture : Record = {
  id: 1,
  patients,
  active: true,
  updatedAt: new Date(),
};
export default recordFixture;
