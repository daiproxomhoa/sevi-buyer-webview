import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage, FormattedNumber } from "react-intl";
import { CardDiv } from "../../../common/component/elements";
import { ISeller } from "../../model";

interface Props {
  info?: ISeller;
}

const SellerInfo = (props: Props) => {
  const { info } = props;

  return (
    <div
      style={{
        overflow: "auto",
        WebkitOverflowScrolling: "touch",
        padding: "12px 0",
      }}
    >
      <Typography variant="subtitle2">
        <FormattedMessage id="search.job" />
      </Typography>
      <CardDiv>
        <Typography variant="body2">{info?.product}</Typography>
      </CardDiv>

      {/* {!!info?.certificates.length && (
        <div style={{ paddingTop: '24px' }}>
          <Typography variant="subtitle2">
            <FormattedMessage id="search.certificate" />
          </Typography>

          {info.certificates.map((one) => (
            <CardDiv>
              <Typography variant="body2">{info?.product}</Typography>
            </CardDiv>
          ))}
        </div>
      )} */}

      {!!info?.items.length && (
        <div style={{ paddingTop: "24px" }}>
          <Typography variant="subtitle2">
            <FormattedMessage id="search.price" />
          </Typography>

          {info.items.map((one) => (
            <CardDiv>
              <Typography variant="body2" style={{ fontWeight: 500 }}>
                {one.name}
              </Typography>
              <Typography variant="caption" color="textSecondary">
                <FormattedMessage
                  id="search.unitPrice"
                  values={{
                    priceRange: (
                      <Typography
                        component="span"
                        variant="caption"
                        color="textPrimary"
                      >
                        <FormattedNumber value={one.minPrice} />
                        &nbsp;-&nbsp;
                        <FormattedNumber value={one.maxPrice} />
                        <FormattedMessage id="currency" />/{one.unit}
                      </Typography>
                    ),
                  }}
                />
              </Typography>
            </CardDiv>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerInfo;
