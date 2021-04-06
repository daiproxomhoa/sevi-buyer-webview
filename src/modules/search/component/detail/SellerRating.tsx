import { fade, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { SECONDARY } from "../../../../configs/colors";
import { CardDiv } from "../../../common/component/elements";
import { some } from "../../../common/constants";
import GradeRoundedIcon from "@material-ui/icons/GradeRounded";
import ReviewInfoItem from "./ReviewInfoItem";

interface Props {
  info?: some;
}

const SellerRating = (props: Props) => {
  const { info } = props;

  return (
    <div style={{ padding: "24px 0" }}>
      {!info?.ratingCount ? (
        <CardDiv>
          <Typography
            variant="body2"
            color="primary"
            style={{ padding: "8px 0", textAlign: "center" }}
          >
            <FormattedMessage id="search.noReview" />
          </Typography>
        </CardDiv>
      ) : (
        <>
          <CardDiv
            style={{
              background: fade(SECONDARY, 0.1),
              padding: "8px",
            }}
          >
            <Typography
              variant="subtitle1"
              color="primary"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <GradeRoundedIcon
                color="inherit"
                style={{
                  marginRight: "3px",
                  marginLeft: "8px",
                }}
              />
              {info?.rating}
            </Typography>

            <Typography
              variant="caption"
              color="primary"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography
                variant="caption"
                component="span"
                color="textSecondary"
              >
                <FormattedMessage id="search.attitude" />
              </Typography>

              <GradeRoundedIcon
                color="inherit"
                style={{
                  fontSize: 12,
                  marginRight: "3px",
                  marginLeft: "8px",
                }}
              />
              {info?.attitudeRating}
            </Typography>
          </CardDiv>
          <Typography
            variant="caption"
            color="textPrimary"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "8px 0",
            }}
          >
            <FormattedNumber value={info.ratingCount} />
            &nbsp;
            <Typography
              variant="caption"
              component="span"
              color="textSecondary"
            >
              <FormattedMessage id="search.reviewCount" />
            </Typography>
          </Typography>

          {info.reviews.map((one: some) => (
            <ReviewInfoItem data={one} key={one.id} />
          ))}
        </>
      )}
    </div>
  );
};

export default SellerRating;