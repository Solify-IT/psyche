import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import getPatients from 'src/redux/controllers/patientController';
import { Patient } from 'src/redux/interfaces/patient';
import { AppState } from '../redux/store';
import '../App.css';

// Temporary view for test purposes
function PatientsList() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getPatients());
  }, [dispatch]);

  const patients = useSelector((state: AppState) => state.patients);
  const patientsList = patients.patients.map((patient: Patient) => (
    <h3 key={patient.name}>{patient.name}</h3>
  ));
  return (
    <div>
      <h1>Pacientes</h1>
      <div className="content" />
      { patientsList }
    </div>
  );
}

export default PatientsList;
