import PatientArea from 'src/interfaces/patientArea';

function hasPatientArea(area: string, list: PatientArea[]) {
  if (list) {
    const found = list.find((element) => element.name === area && element.checked);
    if (found) {
      return true;
    }
    return false;
  }
  return false;
}

export default hasPatientArea;
