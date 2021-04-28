/* import { Patient } from 'domain/model';
import IPatientRepository from 'app/repository/patientRepository';

export default class MockPatientRepository implements IPatientRepository {
  async findAll(): Promise<Patient[]> {
    const patients : Patient[] = [];
    const date: Date = new Date();

    for (let index = 0; index < 5; index += 1) {
      patients.push(
        {
          id: 1,
          name: `Test patient #${index}`,
          lastName: `Lastname #${index}`,
          startDate: date,
          type: 'Adulto',
          telephone: '1234567643',
          address: `Address #${index}`,
          gender: 'femenino',
          birthPlace: 'Guanajuato',
          birthDate: date,
          postalCode: 76148,
          area: 'Psiquiatrica',
          recordId: 1,
        },
      );
    }
    return patients;
  }
}
*/
