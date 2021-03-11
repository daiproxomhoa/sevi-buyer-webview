import React from "react";
import { LIGHT_GREY } from "../../../configs/colors";
import RequestResultItem from "./RequestResultItem";

interface Props {}

const RequestResult = (props: Props) => {
  return (
    <div
      style={{
        borderRadius: "12px",
        backgroundColor: LIGHT_GREY,
        padding: "12px",
        marginTop: "12px",
      }}
    >
      <RequestResultItem />
    </div>
  );
};

export default RequestResult;
