import React from "react";
import PendingRateResult from "./PendingRateResult";

interface Props {}

const PendingRateBox = (props: Props) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "0 24px 24px",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
      <PendingRateResult />
    </div>
  );
};

export default PendingRateBox;
