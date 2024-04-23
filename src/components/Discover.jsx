import { useEffect, useState } from "react";
import axios from "redaxios";
import Header from "./Header";
import DataCard from "./DataCard";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

export default function Discover() {
  const [state, setState] = useState({
    isLoading: false,
    error: "",
    data: [],
  });

  console.log("data", state.data);

  useEffect(() => {
    setState((prev) => ({ isLoading: true, error: "", data: [] }));
    axios
      .get("https://api.pexels.com/v1/curated?per_page=30", {
        headers: {
          Authorization:
            "dYsDEs9X6Ssdm1xO1yoj3EpfBmmJgoXVNfXuzWQH8ilsi1RsjQGWdAyW",
        },
      })
      .then((res) => {
        console.log(res);
        setState((prev) => ({
          isLoading: false,
          error: "",
          data: res.data.photos,
        }));
      })
      .catch((error) => {
        setState((prev) => ({
          isLoading: false,
          error: error,
          data: res.data,
        }));
      });
  }, []);

  if (state.isLoading) {
    return <div>LOADING...</div>;
  }

  if (state.error) {
    return <div>ERROR : {error}</div>;
  }

  let searchResults = [];
  if (state.data && state.data.length > 0) {
    for (let photo of state.data) {
      let photoObj = {
        id: photo.id,
        prompt: photo.photographer,
        result: photo.alt,
        image: photo.src.small,
      };
      searchResults.push(photoObj);
    }
  }

  return (
    <>
      <div className="ml-[10%] text-center h-[15%] w-[60%] border-b-4">
        <div className="sticky top">
          <Header title="Library" headIcon={CenterFocusWeakIcon} />
        </div>

        {searchResults?.length && (
          <ul>
            {searchResults.map((searchResult) => (
              <li key={searchResult.id}>
                <DataCard content={searchResult} />
              </li>
            ))}
          </ul>
        )}

        {searchResults.length === 0 && (
          <p className="text-2xl text-center">
            No results found. Please do some searches
          </p>
        )}
      </div>
    </>
  );
}
