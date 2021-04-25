import { PatientPresenter } from 'interface/presenter';
import patientFixture from 'fixtures/patient';

describe('Patient presenter', () => {
  const patientPresenter : PatientPresenter = new PatientPresenter();
  const patient = patientFixture;
  test('should return patient detail', () => {
    const result = patientPresenter.patientDetail(patient);
    expect(result.name).toEqual(patient.name);
  });
});
