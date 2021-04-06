import {
  GET_PATIENTS,
  GetPatientsStateType,
  PatientActionTypes,
} from '../types/patientTypes';

const initialState: GetPatientsStateType = {
  patients: [],
};

const getPatientsReducer = (
  state = initialState,
  action: PatientActionTypes,
): GetPatientsStateType => {
  switch (action.type) {
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
      };
    default:
      return state;
  }
};

export default getPatientsReducer;
