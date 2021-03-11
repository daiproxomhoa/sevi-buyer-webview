import { Avatar, Button, Typography } from "@material-ui/core";
import React from "react";
import { CardDiv } from "../../common/component/elements";
import RatingDetailItem from "./RatingDetailItem";
import Rating from "@material-ui/lab/Rating";
import { FormattedMessage } from "react-intl";

interface Props {}

const RatedResult = (props: Props) => {
  return (
    <CardDiv>
      <RatingDetailItem />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          margin: "4px 0",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Avatar
            alt=""
            src=""
            style={{ width: "28px", height: "28px", marginRight: "8px" }}
          />
          <Typography variant="caption">Xuân Hòa</Typography>
        </div>
        <Rating readOnly value={5} size="small" />
      </div>
      <Button fullWidth variant="contained" color="primary" size="small">
        <FormattedMessage id="rating.requestAgain" />
      </Button>
    </CardDiv>
  );
};

export default RatedResult;
