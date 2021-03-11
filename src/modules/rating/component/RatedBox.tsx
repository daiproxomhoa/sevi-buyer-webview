import React from "react";
import RatedResult from "./RatedResult";

interface Props {}

const RatedBox = (props: Props) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "0 24px 24px",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <RatedResult />
      <RatedResult />
      <RatedResult />
      <RatedResult />
      <RatedResult />
      <RatedResult />
      <RatedResult />
      <RatedResult />
      <RatedResult />
      <RatedResult />
      <RatedResult />
    </div>
  );
};

export default RatedBox;
