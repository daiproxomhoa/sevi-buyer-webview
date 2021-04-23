import { Button, IconButton, Popover, Typography } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { goBack } from 'connected-react-router';
import React, { useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../../redux/reducer';
import { PageWrapper } from '../../common/component/elements';
import Header from '../../common/component/Header';
import { setLoadingBackDrop } from '../../common/redux/commonReducer';
import CancelRequestDialog from '../component/CancelRequestDialog';
import RequestInfoDetailBox from '../component/RequestInfoDetailBox';
import { IRequest } from '../model';
import { cancelRequest } from '../redux/requestReducer';

interface Props {}

const RequestInfoDetailPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation<{ detail: IRequest }>();
  const { detail } = location.state;

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const onSubmit = React.useCallback(async () => {
    dispatch(setLoadingBackDrop(true));

    await dispatch(cancelRequest(detail));

    dispatch(setLoadingBackDrop(false));

    dispatch(goBack());
  }, [detail, dispatch]);

  return (
    <PageWrapper>
      <Header
        action={() => window.history.back()}
        title={detail?.desc}
        endAdornment={
          <IconButton
            onClick={(event) => {
              setAnchorEl(event.currentTarget);
            }}
          >
            <MoreHorizIcon />
          </IconButton>
        }
      />

      <RequestInfoDetailBox info={detail} />

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
        <Button style={{ padding: '0 24px 0 12px' }} onClick={() => setShowDialog(true)}>
          <Typography variant="body1" color="error">
            <FormattedMessage id="request.cancelRequest" />
          </Typography>
        </Button>
      </Popover>

      <CancelRequestDialog open={showDialog} onClose={() => setShowDialog(false)} onSubmit={onSubmit} />
    </PageWrapper>
  );
};

export default RequestInfoDetailPage;
