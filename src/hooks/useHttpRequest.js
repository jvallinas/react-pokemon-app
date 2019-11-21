import { useState, useEffect } from 'react';

const useHttpRequest = (url, options) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isRequestActivated, setIsRequestActivated] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
      }
      catch (error) {
        setError(error);
      }
      setIsLoading(false);
      setIsRequestActivated(false);
    };
    if (isRequestActivated) {
      fetchData();
    }
  }, [options, url, isRequestActivated]);

  const activateRequest = () => setIsRequestActivated(true);

  return { response, error, isLoading, activateRequest };
};

export default useHttpRequest;