import React from "react";

export default function Header({ title, search, onFilterChange, headIcon }) {
  const HeadIcon = headIcon;
  function handleOnInputChange(event) {
    onFilterChange(event.target.value);
  }
  return (
    <div className=" flex justify-between py-10">
      <div className="flex">
        <HeadIcon />
        <h1 className="text-3xl">{title}</h1>
      </div>
      {search && (
        <div className="relative w-full ml-[500px]">
          <div className="absolute inset-y-0 Sstart-0 flex items-center ps-3 pointer-events-none"></div>
          <input
            type="text"
            id="simple-search"
            className="rounded-md border-stone-950 text-stone-600 w-52 h-12 "
            onChange={handleOnInputChange}
            required
          />
        </div>
      )}
    </div>
  );
}
