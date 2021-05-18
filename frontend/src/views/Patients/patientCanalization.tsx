import React from 'react';
import { useParams } from 'react-router-dom';

interface ParamTypes {
  patientId: string
}

function PatientCanalization() {
  const { patientId } = useParams<ParamTypes>();
  return (
    <div>{patientId}</div>
  );
}

export default PatientCanalization;
