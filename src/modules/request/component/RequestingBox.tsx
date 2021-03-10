import React from "react";
import RequestResult from "./RequestResult";

interface Props {}

const RequestingBox = (props: Props) => {
  return (
    <div
      style={{
        flex: 1,
        padding: "0 24px 24px",
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
      }}
    >
      <RequestResult />
      <RequestResult />
      <RequestResult />
      <RequestResult />
      <RequestResult />
      <RequestResult />
      <RequestResult />
      <RequestResult />
      <RequestResult />
      <RequestResult />
      <RequestResult />
    </div>
  );
};

export default RequestingBox;
