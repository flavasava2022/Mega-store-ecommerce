import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

export const useFetch = (url,forceUpdate) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null)
      try {
        const res = await axios.get(process.env.REACT_APP_BASE_URL + url);

        setData(res.data.data);
      } catch (error) {
        setError(error);
      }

      setLoading(false);
    };
    fetchData();
  }, [url,forceUpdate]);
  return { data, loading, error };
};
