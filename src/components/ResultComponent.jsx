import { Skeleton, Stack } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

function ResultComponent() {
  const result = useSelector((state) => state.search.searchResult);
  const resultCompleted = useSelector((state) => state.search.resultCompleted);

  return (
    <div className="border-2 border-indigo-600 rounded-md mt-10 whitespace-pre-wrap overflow-scroll h-[500px] p-10">
      {result}
      {!resultCompleted && (
        <Stack spacing={1}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={20}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={20}
          />
          <Skeleton
            variant="rectangular"
            animation="wave"
            width="100%"
            height={20}
          />
        </Stack>
      )}
    </div>
  );
}

export default ResultComponent;
