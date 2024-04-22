import React from "react";
import SearchIcon from "@mui/icons-material/Search";

function SearchActionButton({ searchButtonClasses, onSearchClick }) {
  return (
    <button className={searchButtonClasses} onClick={() => onSearchClick()}>
      <SearchIcon />
      Search
    </button>
  );
}

export default SearchActionButton;
