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
import ScheduleIcon from '@material-ui/icons/Schedule';
import SettingsOverscanIcon from '@material-ui/icons/SettingsOverscan';
import { Skeleton } from '@material-ui/lab';
import { goBack } from 'connected-react-router';
import { useAtom } from 'jotai';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import React, { useCallback, useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
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
import { some } from '../../../common/constants';
import { fetchThunk } from '../../../common/redux/thunk';
import { getStatus, textOveflowEllipsis } from '../../utils';
import { CurrentChannelAtom, ErrorFunctionAtom, TickTokLoadData } from '../state-atoms';
import CallIcon from '@material-ui/icons/Call';

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
  request: some;
  isSkeleton?: boolean;
  pubNubClient?: any;
}

const ChatHeader: React.FunctionComponent<Props> = (props) => {
  const { request, isSkeleton, pubNubClient: pubnub } = props;
  const classes = useStyles();
  const dispatch: ThunkDispatch<AppState, null, AnyAction> = useDispatch();
  const intl = useIntl();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [expand, setExpand] = useState(isSkeleton ? false : true);
  const [loadData] = useAtom(TickTokLoadData);
  const [channel] = useAtom(CurrentChannelAtom);
  const [onErrorObj] = useAtom(ErrorFunctionAtom);
  const onError = onErrorObj.function;

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const [requestData, setRequestData] = useState<some>(request);
  const status = getStatus(requestData);

  // const {} = useSWR;
  const handleClose = () => {
    setAnchorEl(null);
  };

  const fireTickTok = useCallback(
    async (value: boolean) => {
      try {
        const message = { message: { type: 'ticktok_load_data', value }, channel };
        pubnub.signal(message);
      } catch (e) {
        onError(e);
      }
    },
    [channel, onError, pubnub],
  );

  const fetchRequest = useCallback(async () => {
    const json = await dispatch(
      fetchThunk(
        API_PATHS.getRequest,
        'post',
        JSON.stringify({
          sellerId: request.sellerId,
          requestDate: decodeURIComponent(request.createDate),
        }),
      ),
    );
    if (json.status === SUCCESS_CODE) {
      setRequestData((one) => ({ one, ...json.body }));
    } else {
      enqueueSnackbar(
        intl.formatMessage({ id: 'chat.loadFail' }),
        snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
      );
    }
  }, [closeSnackbar, dispatch, enqueueSnackbar, intl, request.createDate, request.sellerId]);

  const getConfirm = useCallback(
    async (close: () => void) => {
      const json = await dispatch(
        fetchThunk(
          API_PATHS.confirmRequest,
          'post',
          JSON.stringify({
            sellerId: request.sellerId,
            requestDate: decodeURIComponent(request.createDate),
          }),
        ),
      );

      if (json.status === SUCCESS_CODE && json.body?.result !== 'failure') {
        fireTickTok(!loadData);
        close();
      } else {
        enqueueSnackbar(
          intl.formatMessage({ id: 'chat.loadFail' }),
          snackbarSetting((key) => closeSnackbar(key), { variant: 'error' }),
        );
      }
    },
    [closeSnackbar, dispatch, enqueueSnackbar, fireTickTok, intl, loadData, request.createDate, request.sellerId],
  );

  useEffect(() => {
    fetchRequest();
  }, [fetchRequest, loadData]);

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
          <Box display="flex" alignItems="center">
            <IconButton
              onClick={(event) => {
                const windowAny = window as any;
                if (windowAny.SEVI) {
                  alert(`Calling: ${request.sellerId}`);
                  windowAny.SEVI.postMessage(JSON.stringify({ type: 'call', data: request.sellerId }));
                }
              }}
            >
              <CallIcon style={{ height: 22 }} />
            </IconButton>
            &nbsp;
            <IconButton
              onClick={(event) => {
                setAnchorEl(event.currentTarget);
              }}
            >
              <IconDotList style={{ height: 14 }} />
            </IconButton>
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
                <Typography variant="caption">
                  {requestData?.date ? (
                    moment(requestData?.date, DATE_FORMAT).format(FE_DATE_FORMAT)
                  ) : (
                    <FormattedMessage id="request.anyDay" />
                  )}
                  &nbsp;
                  {requestData?.time ? (
                    moment(requestData?.date, TIME_FULL_FORMAT).format(TIME_FORMAT)
                  ) : (
                    <FormattedMessage id="request.anyTime" />
                  )}
                </Typography>
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
        <Box className="d-flex d-flex-column">
          <ButtonBase className={classes.item}>
            <Typography variant="body1">
              <FormattedMessage id="chat.cancelRequest" />
            </Typography>
          </ButtonBase>
        </Box>
      </Popover>
    </>
  );
};

export default ChatHeader;
