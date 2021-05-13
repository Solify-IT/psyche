import PatientArea from 'src/interfaces/patientArea';
import hasPatientArea from 'src/utils/hasPatientArea';

describe('hasPatientArea', () => {
  test('returns true if area found', () => {
    const list : PatientArea[] = [
      {
        name: 'Asistencia',
        checked: true,
      },
      {
        name: 'Evaluación',
        checked: true,
      },
    ];

    expect(hasPatientArea('Asistencia', list)).toEqual(true);
  });

  test('returns false if area not found', () => {
    const list : PatientArea[] = [
      {
        name: 'Asistencia',
        checked: true,
      },
      {
        name: 'Evaluación',
        checked: true,
      },
    ];

    expect(hasPatientArea('ABC', list)).toEqual(false);
  });

  test('returns false if area found but not checked', () => {
    const list : PatientArea[] = [
      {
        name: 'Asistencia',
        checked: false,
      },
      {
        name: 'Evaluación',
        checked: true,
      },
    ];

    expect(hasPatientArea('AsistenciaABC', list)).toEqual(false);
  });
});
