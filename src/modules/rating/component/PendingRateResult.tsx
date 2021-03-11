import { Avatar, Button, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { CardDiv } from "../../common/component/elements";
import RatingDetailItem from "./RatingDetailItem";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";

interface Props {}

const PendingRateResult = (props: Props) => {
  return (
    <CardDiv>
      <RatingDetailItem />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "4px",
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
        <Button variant="contained" color="primary" size="small">
          <GradeRoundedIcon
            style={{ width: "16px", height: "16px", marginRight: "6px" }}
          />
          <FormattedMessage id="rating.rateNow" />
        </Button>
      </div>
    </CardDiv>
  );
};

export default PendingRateResult;
