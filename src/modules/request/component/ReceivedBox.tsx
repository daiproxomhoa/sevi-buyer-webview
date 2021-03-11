import React from "react";
import ReceivedResult from "./ReceivedResult";

interface Props {}

const ReceivedBox = (props: Props) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "0 24px 24px",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
      <ReceivedResult />
    </div>
  );
};

export default ReceivedBox;
