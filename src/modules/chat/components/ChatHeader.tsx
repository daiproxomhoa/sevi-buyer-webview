import {
  AppBar,
  Avatar,
  Box,
  Button,
  ButtonBase,
  Divider,
  IconButton,
  makeStyles,
  Popover,
  Typography,
  Zoom,
} from '@material-ui/core';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import { goBack } from 'connected-react-router';
import moment from 'moment';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { API_PATHS } from '../../../configs/api';
import { GREEN, GREY_300, PRIMARY } from '../../../configs/colors';
import { FE_DATE_TIME_FORMAT } from '../../../models/moment';
import { ReactComponent as IconDotList } from '../../../svg/ic_dot_list.svg';
import ConfirmDialog from '../../common/component/ConfirmDialog';
import Header from '../../common/component/Header';
import { some } from '../../common/constants';
import { getStatus } from '../utils';

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
    borderRadius: 12,
    padding: 12,
    position: 'relative',
    boxSizing: 'border-box',
    width: '100%',
  },
  panelClose: {
    borderRadius: 12,
    position: 'relative',
    height: 35.5,
    width: 35.5,
  },
  appBar: {
    top: 100,
    padding: '8px 12px',
    background: 'unset',
    boxShadow: 'unset',
    alignItems: 'flex-end',
  },

  iconBtn: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
    color: 'white',
  },
  iconBtnClose: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 4,
    color: 'white',
  },
}));
interface Props {
  request: some;
  isSkeleton?: boolean;
}

const ChatHeader = (props: Props) => {
  const { request, isSkeleton } = props;
  const classes = useStyles();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [expand, setExpand] = useState(isSkeleton ? false : true);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  const status = getStatus(request);
  return (
    <>
      <Header
        title={
          <Box display="flex">
            <Avatar
              src={API_PATHS.renderSellerAvatar(request.sellerId, request.sellerAvatar)}
              style={{ marginRight: 12 }}
            />
            <Box display="flex" flexDirection="column">
              {decodeURIComponent(request.sellerName)}
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
        action={() => dispatch(goBack())}
        appBarProps={{ className: classes.header, elevation: 1 }}
      />
      <AppBar position="sticky" className={classes.appBar}>
        <Box
          className={expand ? classes.panel : classes.panelClose}
          style={{ transition: '0.5s all', background: request.accept ? GREEN : PRIMARY }}
        >
          <IconButton className={expand ? classes.iconBtn : classes.iconBtnClose} onClick={() => setExpand(!expand)}>
            {expand ? <SettingsOverscanIcon /> : <AspectRatioIcon />}
          </IconButton>
          <Zoom in={expand}>
            <Box>
              <Typography variant="body1" style={{ marginRight: 24, minHeight: 23 }}>
                {request?.desc || ''}
              </Typography>
              <Typography variant="body2" style={{ minHeight: 23 }}>
                {request?.location || ''}
              </Typography>
              <Divider className="m-t-8 m-b-8" />
              <Box display="flex" alignItems="center">
                <ScheduleIcon className="m-r-8" />
                <Box flex={1}>
                  <Typography variant="caption">
                    {moment(`${request?.date} ${request?.time}`).format(FE_DATE_TIME_FORMAT)}
                  </Typography>
                </Box>
                <ConfirmDialog
                  children={(open: () => void, close: () => void) =>
                    request.accept && (
                      <Button variant="outlined" color="inherit" size="small" onClick={open}>
                        <Typography variant="body2">
                          <FormattedMessage id="confirm" />
                        </Typography>
                      </Button>
                    )
                  }
                  title={'chat.confirmEcceptTitle'}
                  content={'chat.confirmEcceptContent'}
                  ok={(open: () => void, close: () => void) => {
                    close();
                  }}
                  cancel={(open: () => void, close: () => void) => {
                    close();
                  }}
                />
              </Box>
            </Box>
          </Zoom>
        </Box>
      </AppBar>

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
