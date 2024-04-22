import { useState } from "react";
import axios from "redaxios";

const useMutation = ({ url, method = "POST" }) => {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
  });

  const fn = async (data) => {
    setState((prev) => ({ ...prev, isLoading: true }));
    axios
      .post(url, data)
      .then((res) => {
        setState({ isLoading: false, error: "" });
      })
      .catch((error) => {
        setState({ isLoading: false, error: error });
      });
  };

  return { mutate: fn, ...state };
};

export default useMutation;
