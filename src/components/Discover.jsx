import React from "react";
import Header from "./Header";
import DataCard from "./DataCard";
import { DISCOVER } from "../Discover";
import CenterFocusWeakIcon from "@mui/icons-material/CenterFocusWeak";

export default function Discover() {
  return (
    <>
      <div className="ml-[10%] text-center h-[15%] w-[60%] border-b-4">
        <div className="sticky top">
          <Header title="Discover" headIcon={CenterFocusWeakIcon} />
        </div>

        <ul>
          {DISCOVER.map((library) => (
            <li key={library.id}>
              <DataCard content={library} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
