import { Patient } from 'domain/model';

import { IPatientRepository } from 'app';

export default class MockPatientRepository implements IPatientRepository {

  async findAll(): Promise<Patient[]> {
    const patients : Patient[] = [];

    for (let index = 0; index < 5; index++) {
      patients.push(
        { name: `Test patient #${index}` },
      );
    }
    return patients;
  }
}
