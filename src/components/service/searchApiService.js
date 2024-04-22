import axios from "redaxios";

function getSearches(url) {
  axios
    .get(url)
    .then((res) => {
      setState({ isLoading: false, error: "", data: res });
    })
    .catch((error) => {
      setState({ isLoading: false, error: error, data: [] });
    });
}
