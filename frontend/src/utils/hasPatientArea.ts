import PatientArea from 'src/interfaces/patientArea';

function hasPatientArea(area: string, list: PatientArea[]) {
  const found = list.find((element) => element.name === area && element.checked);
  if (found) {
    return true;
  }
  return false;
}

export default hasPatientArea;
