import { Avatar, fade, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { BLACK_TEXT } from "../../../../configs/colors";
import { CardDiv } from "../../../common/component/elements";
import { some } from "../../../common/constants";

interface Props {
  data: some;
}

const ReviewInfoItem = (props: Props) => {
  const { data } = props;

  return (
    <CardDiv style={{ display: "flex" }}>
      <Avatar
        alt=""
        src=""
        style={{ width: "40px", height: "40px", marginRight: "8px" }}
      />
      <div>
        <Typography variant="body2">{data.name}</Typography>
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "4px" }}
        >
          <Rating
            name="read-only"
            value={data.rating}
            readOnly
            precision={0.1}
            style={{ marginRight: "8px", fontSize: "12px" }}
          />
          <Typography variant="caption" color="textSecondary">
            {data.createdAt}
          </Typography>
        </div>

        <Typography variant="caption" style={{ color: fade(BLACK_TEXT, 0.64) }}>
          {data.content}
        </Typography>
      </div>
    </CardDiv>
  );
};

export default ReviewInfoItem;
