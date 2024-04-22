import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchActions } from "../store/search-slice";

export default function FocusItems() {
  const dispatch = useDispatch();

  const focusItemNumber = useSelector((state) => state.search.focusItemNumber);

  function onFocusItemClick(focusItemNumber) {
    dispatch(
      searchActions.focusItemSelected({
        focusItemNumber: focusItemNumber,
      })
    );
  }

  return (
    <div className="flex flex-col px-1 py-1 mt-2 text-xs md:text-base bg-stone-200 text-stone-400">
      <div className="flex justify-between">
        <div
          className={`${
            focusItemNumber === 1 ? "bg-stone-600" : ""
          } "flex flex-col w-[33%] hover:bg-stone-600 hover:text-stone-100 cursor-pointer"`}
          onClick={() => onFocusItemClick(1)}
        >
          <div className="flex">
            <p>All</p>
          </div>
          <div className="text-wrap- text-left">
            Search accross the entire interet
          </div>
        </div>

        <div
          className={`${
            focusItemNumber === 2 ? "bg-stone-600" : ""
          } "flex flex-col w-[33%] hover:bg-stone-600 hover:text-stone-100 cursor-pointer"`}
          onClick={() => onFocusItemClick(2)}
        >
          <div className="flex">
            <p>Academic</p>
          </div>
          <div className="text-wrap- text-left">
            Search in published academic papers
          </div>
        </div>

        <div
          className={`${
            focusItemNumber === 3 ? "bg-stone-600" : ""
          } "flex flex-col w-[33%] hover:bg-stone-600 hover:text-stone-100 cursor-pointer"`}
          onClick={() => onFocusItemClick(3)}
        >
          <div className="flex">
            <p>Writing</p>
          </div>
          <div className="text-wrap- text-left">
            Generate text or chat without searching the web
          </div>
        </div>
      </div>

      <div className="flex justify-between mt-6">
        <div
          className={`${
            focusItemNumber === 4 ? "bg-stone-600" : ""
          } "flex flex-col w-[33%] hover:bg-stone-600 hover:text-stone-100 cursor-pointer"`}
          onClick={() => onFocusItemClick(4)}
        >
          <div className="flex">
            <p>Wolfran|Alpha</p>
          </div>
          <div className="text-wrap- text-left">
            Computational knowledge engine
          </div>
        </div>

        <div
          className={`${
            focusItemNumber === 5 ? "bg-stone-600" : ""
          } "flex flex-col w-[33%] hover:bg-stone-600 hover:text-stone-100 cursor-pointer"`}
          onClick={() => onFocusItemClick(5)}
        >
          <div className="flex">
            <p>Youtube</p>
          </div>
          <div className="text-wrap- text-left">Discover and watch videos</div>
        </div>

        <div
          className={`${
            focusItemNumber === 6 ? "bg-stone-600" : ""
          } "flex flex-col w-[33%] hover:bg-stone-600 hover:text-stone-100 cursor-pointer"`}
          onClick={() => onFocusItemClick(6)}
        >
          <div className="flex">
            <p>Reddit</p>
          </div>
          <div className="text-wrap- text-left">
            Search for discussions and opinions
          </div>
        </div>
      </div>
    </div>
  );
}
