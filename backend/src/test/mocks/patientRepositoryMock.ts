import { Patient } from 'domain/model';
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
          middleName: `Middlename #${index}`,
          lastName: `Lastname #${index}`,
          startDate: date,
          type: 'Adulto',
          age: 22,
          telephone: '1234567643',
          address: `Address #${index}`,
          gender: 'femenino',
          birthPlace: 'Guanajuato',
          birthDate: '02/02/1998',
          postalCode: '76148',
        },
      );
    }
    return patients;
  }
}
