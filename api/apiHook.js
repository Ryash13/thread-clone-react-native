import axios from "axios";
import { useEffect, useState } from "react";
import { API_BASE_URL } from "@env";

const apiHook = (endpoint, method, query) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const options = {
    method: `${method}`,
    url: `${API_BASE_URL}${endpoint}`,
    params: { ...query },
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.request(options);
      setData(response.data.data);
      setLoading(false);
    } catch (error) {
      console.log("Error occured,", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetchData = () => {
    setLoading(true);
    fetchData();
  };

  return { refetchData, data, loading, error };
};

export default apiHook;
