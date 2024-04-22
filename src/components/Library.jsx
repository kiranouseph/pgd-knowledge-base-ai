import React from "react";
import Header from "./Header";
import DataCard from "./DataCard";
import { useSelector } from "react-redux";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import useFetchItems from "./hooks/useFetchItems";

export default function Library() {
  const GET_SEARCHES_URL = "http://localhost:3000/results";
  const { isLoading, error, data } = useFetchItems(GET_SEARCHES_URL);

  if (isLoading) {
    return <div>LOADING...</div>;
  }

  if (error) {
    return <div>ERROR : {error}</div>;
  }

  let searchResults = [];
  if (data && data.searches && data.searches.length > 0) {
    searchResults = data.searches.slice();
    searchResults.sort(function (a, b) {
      var c = new Date(a.time);
      var d = new Date(b.time);
      return d - c;
    });
  }

  function handleFiltering(text) {
    searchResults = searchResults.filter(
      (x) =>
        x.title.toLowerCase().includes(text.toLowerCase()) ||
        x.description.toLowerCase().includes(text.toLowerCase())
    );
  }

  return (
    <>
      <div className="ml-[10%] text-center h-[15%] w-[60%] border-b-4">
        <div className="sticky top">
          <Header
            title="Library"
            search
            onFilterChange={handleFiltering}
            headIcon={LibraryBooksIcon}
          />
        </div>

        {searchResults?.length && (
          <ul>
            {searchResults.map((searchResult) => (
              <li key={searchResult._id}>
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
