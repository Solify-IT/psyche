import { combineReducers } from 'redux';
import getPatientsReducer from './patientReducer';

const rootReducer = combineReducers({
  patients: getPatientsReducer,
});

export default rootReducer;
