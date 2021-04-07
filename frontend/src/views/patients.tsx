import React, { useEffect, useState } from 'react';
import getPatients from 'src/controllers/patientController';
import { Patient } from 'src/interfaces/patient';
import '../App.css';

// Temporary view for test purposes
function PatientsList() {
  const [patients, setData] = useState<Patient[]>([]);

  const getData = async () => {
    const results = await getPatients();
    setData(results);
  };

  useEffect(() => {
    getData();
  }, []);

  const patientsList = patients.map((patient: Patient) => (
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
