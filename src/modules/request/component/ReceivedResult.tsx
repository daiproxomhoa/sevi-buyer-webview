import { Button } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { RED } from "../../../configs/colors";
import { CardDiv } from "../../common/component/elements";
import RequestResultItem from "./RequestResultItem";

interface Props {}

const ReceivedResult = (props: Props) => {
  return (
    <CardDiv>
      <RequestResultItem />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "4px",
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          color="secondary"
          size="small"
          style={{ color: RED, borderColor: RED, marginRight: "4px" }}
        >
          <FormattedMessage id="cancel" />
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: "4px" }}
        >
          <FormattedMessage id="confirm" />
        </Button>
      </div>
    </CardDiv>
  );
};

export default ReceivedResult;
