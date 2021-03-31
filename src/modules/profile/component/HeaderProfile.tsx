import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { ReactComponent as IconDotList } from "../../../svg/ic_dot_list.svg";
import { FormattedMessage } from "react-intl";
import { GREY_300 } from "../../../configs/colors";
import { ROUTES } from "../../../configs/routes";
import { RawLink } from "../../common/component/Link";
import { CssIconButton } from "../../common/component/IconButton";
import { ReactComponent as BackIcon } from "../../../svg/chevron-back.svg";
import Header from "../../common/component/Header";

interface Props {
  action?: () => void;
  title?: string;
  avatar?: string;
}

const HeaderProfile = (props: Props) => {
  const { action, title, avatar } = props;
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Header
        title={title}
        endAdornment={
          !action && (
            <IconButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <IconDotList style={{ height: 14 }} />
            </IconButton>
          )
        }
        startAdornment={
          !action && <Avatar src={avatar} style={{ marginRight: 12 }} />
        }
        action={action}
      />
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
          <RawLink to={ROUTES.editProfile}>
            <ButtonBase
              style={{
                borderBottom: `1px solid ${GREY_300}`,
                padding: "8px 12px",
              }}
              className="justify-content-start"
            >
              <Typography variant="body1">
                <FormattedMessage id="profile.edit" />
              </Typography>
            </ButtonBase>
          </RawLink>
          <ButtonBase
            style={{
              borderBottom: `1px solid ${GREY_300}`,
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
              borderBottom: `1px solid ${GREY_300}`,
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
    </>
  );
};

export default HeaderProfile;
