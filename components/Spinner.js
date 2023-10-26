import React from "react";
import { ClipLoader } from "react-spinners";

function Spinner() {
  return (
      <ClipLoader className="top-1/2" color={"#1E3A8A"} speedMultiplier={2} />
  );
}

export default Spinner;
