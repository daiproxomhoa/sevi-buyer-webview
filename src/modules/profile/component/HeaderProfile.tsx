import {
  Avatar,
  Box,
  ButtonBase,
  IconButton,
  Popover,
  Typography,
} from "@material-ui/core";
import { push } from "connected-react-router";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { GREY_300 } from "../../../configs/colors";
import { ROUTES } from "../../../configs/routes";
import { ReactComponent as IconDotList } from "../../../svg/ic_dot_list.svg";
import { logout } from "../../authen/redux/authenReducer";
import Header from "../../common/component/Header";

interface Props {
  action?: () => void;
  title?: string;
  avatar?: string;
}

const HeaderProfile = (props: Props) => {
  const { action, title, avatar } = props;
  const dispatch = useDispatch();
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
          <ButtonBase
            disabled={!avatar}
            onClick={() => dispatch(push(ROUTES.editProfile))}
            style={{
              borderBottom: `1px solid ${GREY_300}`,
              padding: "8px 12px",
              width: "100%",
            }}
            className="justify-content-start"
          >
            <Typography variant="body1">
              <FormattedMessage id="profile.edit" />
            </Typography>
          </ButtonBase>
          <ButtonBase
            disabled={!avatar}
            onClick={() => dispatch(push(ROUTES.changePass))}
            style={{
              borderBottom: `1px solid ${GREY_300}`,
              padding: "8px 12px",
              width: "100%",
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
              width: "100%",
            }}
            className="justify-content-start"
            onClick={() => {
              dispatch(logout());
            }}
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
