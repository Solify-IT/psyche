import { AxiosError, AxiosResponse } from 'axios';
import React, { useEffect, useState } from 'react';
import LoadingSpinner from 'src/components/loadingSpinner';

function PromiseLoader<T>(
  promise: Promise<AxiosResponse<any>>,
  onLoad: (data: T) => JSX.Element,
  onError: (error: AxiosError) => JSX.Element,
) {
  const [data, setData] = useState<T>();
  const [error, setError] = useState<AxiosError>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await promise;
        setData(response.data);
        console.log(response);
      } catch (e) {
        const err = e as AxiosError;
        setError(err);
      }
    };
    fetchData();
  }, []);

  if (error) {
    console.error(error);
    return onError(error);
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
