import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useM2EPrice() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchM2EData = async () => {
      setIsLoading(true);
      setIsError(false);
      try {
        const response = await axios.get(
          process.env.REACT_APP_COINMARKETCAP_API,
          {
            params: {
                id: 'M2E_ID',
            },
            headers: {
              'X-CMC_PRO_API_KEY': process.env.REACT_APP_COINMARKETCAP_API_KEY,
            },
          },
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error Fetching M2E data:', error);
        setIsError(true);
        setIsLoading(false);
      }
    };

    fetchM2EData();
  }, []);

  return {data, isLoading, isError};
}