import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from 'src/components/loadingSpinner';

function PromiseLoader<T>(
  promise: () => Promise<AxiosResponse<any>>,
  onLoad: (data: T) => JSX.Element,
  onError?: (error: AxiosError) => JSX.Element,
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await promise();
        const result = response.data ? response.data : response;
        setData(result);
      } catch (e) {
        const err = e as AxiosError;
        setError(err);
      }
    };
    fetchData();
  }, []);

  if (error) {
    if (onError) {
      return onError(error);
    }
    // default error handling
    switch (error.response?.status) {
      case 404:
        return <h2>No se encontró el expediente</h2>;
      default:
        return <h2>Ocurrió un error de conexión.</h2>;
    }
  }
  if (data === undefined) {
    console.log('Loading content...');
    return <LoadingSpinner />;
  }
  if (data) {
    console.log('Content loaded.');
    return onLoad(data);
  }
  return <h1>Internal error :(</h1>;
}

export default PromiseLoader;
