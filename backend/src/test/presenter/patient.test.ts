import { PatientPresenter } from 'interface/presenter';
import patientFixture from 'fixtures/patient';
import Record from 'domain/model/record';

describe('Patient presenter', () => {
  const patientPresenter : PatientPresenter = new PatientPresenter();
  const record : Record = {
    id: 1,
    patients: [patientFixture, patientFixture],
    active: true,
  };

  const patients = [patientFixture, patientFixture];

  test('should return record detail when record is called', () => {
    const result = patientPresenter.record(record);
    expect(result).toEqual(record);
  });

  test('should return list of patients when findAll is called', () => {
    const result = patientPresenter.findAll(patients);
    expect(result).toEqual(patients);
  });
});
