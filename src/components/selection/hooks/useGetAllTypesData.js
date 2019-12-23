import { useState, useEffect } from 'react';
import useHttpRequest from '../../../hooks/useHttpRequest';

const urlTypes = 'https://pokeapi.co/api/v2/type/';

const useGetAllTypesData = () => {
  const { response: typesResponse } = useHttpRequest(urlTypes);

  const [fetchedData, setFetchedData] = useState(null);

  // Adding received data from backend to Redux store
  useEffect(
    () => {
      if (typesResponse) {
        const fetchTypes = typesResponse.results
          .map((typeInfo) => `${urlTypes}${typeInfo.name}`)
          .map((urlType) => fetch(urlType));

        if (fetchedData === null) {
          (async () => {
            const result = await Promise.all(fetchTypes).then((response) => {
              const responses = response.map((res) => res.json());
              return Promise.all(responses);
            });

            setFetchedData(result);
          })();
        }
      }
    }, [typesResponse, fetchedData],
  );
  return { fetchedData };
};

export default useGetAllTypesData;
