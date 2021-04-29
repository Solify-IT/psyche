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
  test('should return patient detail', () => {
    const result = patientPresenter.record(record);
    expect(result.patients).toEqual(record.patients);
    expect(result.id).toEqual(record.id);
    expect(result.active).toEqual(record.active);
  });
});
