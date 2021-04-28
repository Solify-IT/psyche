import React, { useEffect, useState } from 'react';
import Patient from 'src/interfaces';
import server from 'src/utils/server';
import handleResponse from '../utils/handleResponse';
import '../App.css';

// Temporary view for test purposes
function PatientsList() {
  const [patients, setPatients] = useState<Patient[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const results = await server.get<Patient[]>('/patients').then(handleResponse).catch(handleResponse);
      setPatients(results.data);
    };
    fetchData();
    console.log(patients);
  }, []);
  return (
    <div>
      <h1>Pacientes</h1>
      <div className="content" />
    </div>
  );
}

export default PatientsList;
