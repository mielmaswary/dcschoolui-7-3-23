import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const useFetch = (url) => {
  console.log("🚀 ~ file: useFetch.js:6 ~ useFetch ~ url", url);
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(url)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return [data, isLoading, error];
};

export default useFetch;
