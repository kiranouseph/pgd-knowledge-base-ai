import React, { useEffect } from "react";
import Home from "../components/Home";
import { searchActions } from "../store/search-slice";
import { useDispatch } from "react-redux";

function HomePage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(searchActions.initiateSearch());
  }, []);

  return (
    <>
      <Home />
    </>
  );
}

export default HomePage;
