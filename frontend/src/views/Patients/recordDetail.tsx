import React from 'react';

import server from 'src/utils/server';
import 'src/App.css';
import Record from 'src/interfaces/record';
import { useParams } from 'react-router-dom';
import PromiseLoader from 'src/utils/promiseLoader';
import RecordInfo from 'src/components/recordInfo';

function RecordDetail() {
  const { id } : any = useParams();
  const mPromise = server.get<Record>(`/records/${id}`);
  const content = PromiseLoader<Record>(
    mPromise,
    (record) => <RecordInfo record={record} />,
    (error) => {
      switch (error.response?.status) {
        case 404:
          return <h2>No se encontró el expediente</h2>;
        default:
          return <h2>Ocurrió un error de conexión.</h2>;
      }
    },
  );
  return content;
}

export default RecordDetail;
