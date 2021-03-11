import React from "react";
import { CardDiv } from "../../common/component/elements";
import RequestResultItem from "./RequestResultItem";

interface Props {}

const RequestResult = (props: Props) => {
  return (
    <CardDiv>
      <RequestResultItem />
    </CardDiv>
  );
};

export default RequestResult;
