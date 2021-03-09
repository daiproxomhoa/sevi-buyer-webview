import { AppBar, Typography } from "@material-ui/core";
import React from "react";
import { FormattedMessage } from "react-intl";
import { ReactComponent as BackIcon } from "../../../../svg/chevron-back.svg";
import { CssIconButton } from "../../../common/component/IconButton";

interface Props {
  action(): void;
}

const Header = (props: Props) => {
  const { action } = props;

  return (
    <AppBar
      position={"sticky"}
      style={{
        paddingTop: "16px",
        minHeight: "48px",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
      }}
      color="inherit"
      elevation={0}
    >
      <CssIconButton color="inherit" onClick={action}>
        <BackIcon />
      </CssIconButton>
      <Typography variant="h6">
        <FormattedMessage id="forgotPassword" />
      </Typography>
    </AppBar>
  );
};

export default Header;
