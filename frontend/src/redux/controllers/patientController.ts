import { Dispatch } from 'redux';
import { apiGet } from 'src/api';
import getPatientsAction from '../actions/patientActions';
import { Patient } from '../interfaces/patient';
import { PatientActionTypes } from '../types/patientTypes';

const getPatients = () => (dispatch: Dispatch<PatientActionTypes>) => {
  apiGet<Patient[]>('/patients')
    .then((data) => {
      console.log(data);
      dispatch(getPatientsAction(data));
      return data;
    });
};
export default getPatients;
