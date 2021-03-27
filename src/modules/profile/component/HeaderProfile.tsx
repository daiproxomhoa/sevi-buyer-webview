import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Divider,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { ReactComponent as IconDotList } from "../../../svg/ic_dot_list.svg";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";
import { GREY_5 } from "../../../configs/colors";

interface Props {
  action?: () => void;
  title?: string;
}
const HeaderProfile = (props: Props) => {
  const { action, title } = props;
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <AppBar
      position={"sticky"}
      style={{
        paddingTop: "16px",
        minHeight: "48px",
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        padding: "12px 8px 12px 24px",
      }}
      color="inherit"
      elevation={0}
    >
      <Avatar src="" />
      <Box marginLeft={1} flex={1} className="overflow-hidden">
        <Typography variant="subtitle2" className="text-ellipsis">
          {title}
        </Typography>
      </Box>
      <IconButton
        onClick={(event) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        <IconDotList style={{ height: 14 }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        elevation={1}
      >
        <Box className="d-flex d-flex-column">
          <ButtonBase
            style={{
              borderBottom: `1px solid ${GREY_5}`,
              padding: "8px 12px",
            }}
            className="justify-content-start"
          >
            <Typography variant="body1">
              <FormattedMessage id="profile.edit" />
            </Typography>
          </ButtonBase>
          <ButtonBase
            style={{
              borderBottom: `1px solid ${GREY_5}`,
              padding: "8px 12px",
            }}
            className="justify-content-start"
          >
            <Typography variant="body1">
              <FormattedMessage id="profile.changePassword" />
            </Typography>
          </ButtonBase>
          <ButtonBase
            style={{
              borderBottom: `1px solid ${GREY_5}`,
              padding: "8px 12px",
            }}
            className="justify-content-start"
          >
            <Typography variant="body1">
              <FormattedMessage id="profile.logout" />
            </Typography>
          </ButtonBase>
        </Box>
      </Popover>
    </AppBar>
  );
};
export default HeaderProfile;
