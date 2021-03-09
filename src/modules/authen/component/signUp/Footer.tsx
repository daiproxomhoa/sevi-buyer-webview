import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ROUTES } from "../../../../configs/routes";
import { RawLink } from "../../../common/component/Link";

interface Props {}

const Footer = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        flex: 1,
        justifyContent: "center",
        alignItems: "flex-end",
        marginBottom: "52px",
      }}
    >
      <Typography variant="body2" color="textSecondary">
        <FormattedMessage id="alreadyHaveAnAccount" />
        &nbsp;
        <RawLink to={ROUTES.login}>
          <Typography
            component="span"
            variant="body2"
            color="textPrimary"
            style={{ fontWeight: 500 }}
          >
            <FormattedMessage id="login" />
          </Typography>
        </RawLink>
      </Typography>
    </div>
  );
};

export default Footer;
