import { Button } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { LIGHT_GREY, RED } from "../../../configs/colors";
import RequestResultItem from "./RequestResultItem";

interface Props {}

const ReceivedResult = (props: Props) => {
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
    </div>
  );
};

export default ReceivedResult;
