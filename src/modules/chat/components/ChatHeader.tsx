import {
  AppBar,
  Avatar,
  Box,
  ButtonBase,
  Divider,
  IconButton,
  makeStyles,
  Popover,
  Typography,
} from '@material-ui/core';
import { green, yellow } from '@material-ui/core/colors';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { API_PATHS } from '../../../configs/api';
import { GREEN, GREY_300 } from '../../../configs/colors';
import { ReactComponent as IconDotList } from '../../../svg/ic_dot_list.svg';
import Header from '../../common/component/Header';
import { some } from '../../common/constants';
import { getFullName } from '../../rating/utils';
import { getStatus } from '../utils';
import ScheduleIcon from '@material-ui/icons/Schedule';
import moment from 'moment';
import { DATE_FORMAT, FE_DATE_TIME_FORMAT } from '../../../models/moment';
import TurnedInRoundedIcon from '@material-ui/icons/TurnedInRounded';

const useStyles = makeStyles((theme) => ({
  item: {
    minWidth: 190,
    justifyContent: 'flex-start',
    borderBottom: `1px solid ${GREY_300}`,
    padding: '8px 12px',
    width: '100%',
  },
  header: {
    paddingBottom: 32,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
  },
  dot: {
    borderRadius: 6,
    height: 12,
    width: 12,
    marginRight: 8,
  },
  panel: {
    background: GREEN,
    borderRadius: 12,
    padding: 12,
    position: 'relative',
  },
  appBar: {
    top: 100,
    padding: '8px 12px',
    background: 'unset',
    boxShadow: 'unset',
  },
  iconTurned: {
    position: 'absolute',
    top: 2,
    right: 12,
  },
}));
interface Props {
  action?: () => void;
  request: some;
}

const ChatHeader = (props: Props) => {
  const { action, request } = props;
  const { seller } = request;

  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<any>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  console.log('seller', request);
  const status = getStatus(request);
  return (
    <>
      <Header
        title={
          <Box display="flex">
            <Avatar src={API_PATHS.renderSellerAvatar(seller?.id, seller?.avatar)} style={{ marginRight: 12 }} />
            <Box display="flex" flexDirection="column">
              {getFullName(seller)}
              <Box display="flex" alignItems="center">
                <Box className={classes.dot} style={{ background: status.color }} />
                <Typography variant="caption">
                  <FormattedMessage id={status.id} />
                </Typography>
              </Box>
            </Box>
          </Box>
        }
        endAdornment={
          <IconButton
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <IconDotList style={{ height: 14 }} />
          </IconButton>
        }
        action={action}
        appBarProps={{ className: classes.header, elevation: 1 }}
      />
      {request.accept && (
        <AppBar position="sticky" className={classes.appBar}>
          <Box className={classes.panel}>
            <TurnedInRoundedIcon className={classes.iconTurned} />
            <Typography variant="body1" style={{ marginRight: 24 }}>
              {request?.desc}
            </Typography>
            <Typography variant="body2">{request?.location}</Typography>
            <Divider className="m-t-8 m-b-8" />
            <Box display="flex" alignItems="center">
              <ScheduleIcon className="m-r-8" />
              <Typography variant="body1">
                {moment(`${request?.date} ${request?.time}`).format(FE_DATE_TIME_FORMAT)}
              </Typography>
            </Box>
          </Box>
        </AppBar>
      )}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        elevation={1}
      >
        <Box className="d-flex d-flex-column">
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.complain" />
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.cancelRequest" />
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.deleteConversation" />
            </Typography>
          </ButtonBase>
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.block" />
            </Typography>
          </ButtonBase>
        </Box>
      </Popover>
    </>
  );
};

export default ChatHeader;
