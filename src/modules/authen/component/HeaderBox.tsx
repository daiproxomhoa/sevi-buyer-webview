import { Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ReactComponent as Logo } from "../../../svg/logo.svg";

interface Props {
  title: string;
  caption: React.ReactNode;
}

const HeaderBox = (props: Props) => {
  const { title, caption } = props;

  return (
    <div
      style={{
        margin: "98px 16px 12px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
      }}
    >
      <Logo style={{ width: "72px", height: "72px", marginBottom: "36px" }} />
      <Typography variant="subtitle1">
        <FormattedMessage id={title} />
      </Typography>
      {caption}
    </div>
  );
};

export default HeaderBox;
