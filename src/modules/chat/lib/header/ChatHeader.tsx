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
} from '@material-ui/core';
import AspectRatioIcon from '@material-ui/icons/AspectRatio';
import CallIcon from '@material-ui/icons/Call';
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import { Skeleton } from '@material-ui/lab';
import { goBack } from 'connected-react-router';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { memo, useCallback, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { API_PATHS } from '../../../../configs/api';
import { GREEN, GREY_300, PRIMARY } from '../../../../configs/colors';
import { SUCCESS_CODE } from '../../../../constants';
import { DATE_FORMAT, FE_DATE_FORMAT, TIME_FORMAT, TIME_FULL_FORMAT } from '../../../../models/moment';
import { AppState } from '../../../../redux/reducer';
import { ReactComponent as IconDotList } from '../../../../svg/ic_dot_list.svg';
import ConfirmDialog from '../../../common/component/ConfirmDialog';
import { snackbarSetting } from '../../../common/component/elements';
import Header from '../../../common/component/Header';
import { APIHost, some } from '../../../common/constants';
import { setLoadingBackDrop } from '../../../common/redux/commonReducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { getStatus, textOveflowEllipsis } from '../../utils';

const useStyles = makeStyles(() => ({
  item: {
    minWidth: 190,
    justifyContent: 'flex-start',
    borderBottom: `1px solid ${GREY_300}`,
    padding: '8px 12px',
    width: '100%',
  },
  dot: {
    borderRadius: 6,
    height: 12,
    width: 12,
    marginRight: 8,
  },
  panel: {
    transition: 'width 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, height 500ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    overflow: 'hidden',
    position: 'relative',
    borderRadius: 12,
    padding: 12,
    boxSizing: 'border-box',
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
}));

interface Props {
  requestData: some;
  loading: boolean;
  fetchRequest: () => void;
  fireTickTok: () => void;
}

const ChatHeader: React.FunctionComponent<Props> = (props) => {
  const { requestData, fetchRequest, fireTickTok, loading } = props;
  const classes = useStyles();
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
  const intl = useIntl();
  const profileData = useSelector((state: AppState) => state.profile.data);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [expand, setExpand] = useState(true);

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const status = getStatus(requestData);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getConfirm = useCallback(
    async (close: () => void) => {
      const json = await dispatch(
        fetchThunk(
          API_PATHS.confirmRequest,
          'post',
          JSON.stringify({
            sellerId: requestData.sellerId,
            requestDate: decodeURIComponent(requestData.createDate),
          }),
        ),
      );

      if (json.status === SUCCESS_CODE && json.body?.result !== 'failure') {
        fireTickTok();
        close();
      } else {
        enqueueSnackbar(
          intl.formatMessage({ id: 'chat.loadFail' }),
          snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
        );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, fireTickTok, intl, requestData.createDate, requestData.sellerId],
  );

  const onCancelRequest = useCallback(
    async (close: () => void) => {
      dispatch(setLoadingBackDrop(true));
      const json = await dispatch(
        fetchThunk(API_PATHS.cancelRequest, 'post', {
          sellerId: requestData.sellerId,
          requestDate: requestData.createDate,
        }),
      );
      dispatch(setLoadingBackDrop(false));
      if (json.status === SUCCESS_CODE && json.body?.result !== 'failure') {
        enqueueSnackbar(
          intl.formatMessage({ id: 'chat.cancelSuccess' }),
          snackbarSetting((key) => closeSnackbar(key), { variant: 'success' }),
        );
        close();
        setAnchorEl(null);
        fetchRequest();
      } else {
        enqueueSnackbar(
          intl.formatMessage({ id: 'chat.cancelFail' }),
          snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
        );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, fetchRequest, intl, requestData.createDate, requestData.sellerId],
  );

  return (
    <>
      <Header
        title={
          <Box display="flex">
            <Avatar
              src={API_PATHS.renderSellerAvatar(requestData.sellerId, requestData.sellerAvatar)}
              style={{ marginRight: 12 }}
            />
            <Box display="flex" flexDirection="column">
              {decodeURIComponent(requestData.sellerName)}
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
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={(event) => {
                const windowAny = window as any;
                const requestCreateDate = decodeURIComponent(requestData.createDate);
                if (windowAny.SEVI) {
                  windowAny.SEVI.postMessage(
                    JSON.stringify({
                      type: 'call',
                      sellerId: `seller${requestData.sellerId}`,
                      sellerAvatar: `${APIHost}/seller/getAvatar/${requestData.sellerId}/${requestData.sellerAvatar}`,
                      sellerName: requestData.sellerName,
                      buyerName: `${profileData?.givenName}`,
                      buyerAvatar: `${APIHost}/getAvatar/${profileData?.id}/${profileData?.avatar}`,
                      requestCreateDate: requestCreateDate,
                    }),
                  );
                }
              }}
            >
              <CallIcon style={{ height: 22 }} />
            </IconButton>
            &nbsp;
            {!(requestData.accept || requestData.cancel) && (
              <IconButton
                onClick={(event) => {
                  setAnchorEl(event.currentTarget);
                }}
              >
                <IconDotList style={{ height: 14 }} />
              </IconButton>
            )}
          </Box>
        }
        action={() => dispatch(goBack())}
        appBarProps={{ elevation: 1 }}
      />
      <AppBar position="sticky" className={classes.appBar}>
        <Box
          className={classes.panel}
          style={
            expand
              ? {
                  background: requestData.accept ? GREEN : PRIMARY,
                  width: '100%',
                  height: 128,
                }
              : {
                  background: requestData.accept ? GREEN : PRIMARY,
                  height: 35.5,
                  width: 35.5,
                }
          }
        >
          <IconButton className={classes.iconBtn} style={{ zIndex: 2 }} onClick={() => setExpand(!expand)}>
            {expand ? <SettingsOverscanIcon /> : <AspectRatioIcon />}
          </IconButton>
          <Box
            style={{
              transition: '0.5s opacity',
              opacity: expand ? 1 : 0,
            }}
          >
            <Box marginRight={4.5} height={60}>
              <Typography variant="body1" noWrap>
                {requestData?.desc || <Skeleton />}
              </Typography>
              <Typography variant="body2" style={{ wordBreak: 'break-word' }} component={'div'}>
                {textOveflowEllipsis(requestData?.location) || <Skeleton />}
              </Typography>
            </Box>
            <Divider className="m-t-8 m-b-8" />
            <Box display="flex" alignItems="center">
              <ScheduleIcon className="m-r-8" />
              <Box flex={1}>
                {loading ? (
                  <Skeleton style={{ margin: '0px 8px' }} />
                ) : (
                  <Typography variant="caption">
                    {requestData?.date ? (
                      moment(requestData?.date, DATE_FORMAT).format(FE_DATE_FORMAT)
                    ) : (
                      <FormattedMessage id="requestData.anyDay" />
                    )}
                    &nbsp;
                    {requestData?.time ? (
                      moment(requestData?.date, TIME_FULL_FORMAT).format(TIME_FORMAT)
                    ) : (
                      <FormattedMessage id="requestData.anyTime" />
                    )}
                  </Typography>
                )}
              </Box>
              <ConfirmDialog
                children={(open: () => void, close: () => void) =>
                  requestData?.accept && (
                    <Button variant="outlined" color="inherit" size="small" onClick={open}>
                      <Typography variant="body2">
                        <FormattedMessage id="confirm" />
                      </Typography>
                    </Button>
                  )
                }
                title={'chat.confirmAcceptTitle'}
                content={'chat.confirmAcceptContent'}
                ok={(open: () => void, close: () => void) => {
                  getConfirm(close);
                }}
                cancel={(open: () => void, close: () => void) => {
                  close();
                }}
              />
            </Box>
          </Box>
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
        <ConfirmDialog
          children={(open: () => void, close: () => void) => (
            <Box className="d-flex d-flex-column">
              <ButtonBase className={classes.item} onClick={open}>
                <Typography variant="body1">
                  <FormattedMessage id="chat.cancelRequest" />
                </Typography>
              </ButtonBase>
            </Box>
          )}
          title={'chat.confirmCancelTitle'}
          content={'chat.confirmCancelContent'}
          ok={(open: () => void, close: () => void) => {
            onCancelRequest(close);
          }}
          cancel={(open: () => void, close: () => void) => {
            close();
          }}
        />
      </Popover>
    </>
  );
};

export default memo(ChatHeader);
