import { React } from "react";
import Search from "./Search";
import { useSelector } from "react-redux";

export default function Home() {
  const showTitle = useSelector((state) => state.search.titleVisible);

  return (
    <>
      <div className={`text-centre ${showTitle ? "mt-60" : ""}`}>
        {showTitle && (
          <h2 className="text-5xl ml-[20%] mr-[20%] text-stone-950 my-4">
            Where knowledge begins
          </h2>
        )}
        <Search modal={false} />
      </div>
    </>
  );
}
