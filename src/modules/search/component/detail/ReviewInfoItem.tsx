import { Avatar, fade, Typography } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import React from "react";
import { API_PATHS } from "../../../../configs/api";
import { BLACK_TEXT } from "../../../../configs/colors";
import { CardDiv } from "../../../common/component/elements";
import { ISellerRating } from "../../model";

interface Props {
  data: ISellerRating;
}

const ReviewInfoItem = (props: Props) => {
  const { data } = props;

  return (
    <CardDiv style={{ display: "flex" }}>
      <Avatar
        alt=""
        src={API_PATHS.renderAvatar(data.buyer.id, data.buyer.avatar)}
        style={{ width: "40px", height: "40px", marginRight: "8px" }}
      />
      <div>
        <Typography variant="body2">
          {data.buyer.givenName}&nbsp;{data.buyer.familyName}
        </Typography>
        <div
          style={{ display: "flex", alignItems: "center", paddingTop: "4px" }}
        >
          <Rating
            name="read-only"
            value={data.rating ?? 0}
            readOnly
            precision={0.1}
            style={{ marginRight: "8px", fontSize: "12px" }}
          />
          <Typography variant="caption" color="textSecondary">
            {data.rateDate}
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
