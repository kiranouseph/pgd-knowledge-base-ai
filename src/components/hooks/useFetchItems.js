import { useEffect, useState } from "react";
import axios from "redaxios";

const useFetchItems = (url) => {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    data: [],
  });

  // const fn = async () => {};

  useEffect(() => {
    setState((prev) => ({ isLoading: true, error: "", data: [] }));
    axios
      .get(url)
      .then((res) => {
        setState((prev) => ({ isLoading: false, error: "", data: res.data }));
      })
      .catch((error) => {
        setState((prev) => ({
          isLoading: false,
          error: error,
          data: res.data,
        }));
      });
  }, [url]);

  return { ...state };
};

export default useFetchItems;
