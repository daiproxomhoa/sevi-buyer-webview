import { push } from 'connected-react-router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../../configs/api';
import { ROUTES } from '../../../../configs/routes';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducer';
import { setLoadingBackDrop } from '../../../common/redux/commonReducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { IRequest } from '../../model';
import { confirmRequest } from '../../redux/requestReducer';
import UnconfirmedRequestBox from './UnconfirmedRequestBox';
import ConfirmAcceptedRequestDialog from './ConfirmAcceptedRequestDialog';

interface Props {
  accept: boolean;
}

const PAGE_SIZE = 20;

const UnconfirmedRequestTab = (props: Props) => {
  const { accept } = props;

  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [showLoadMore, setShowLoadMore] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [requestDetail, setRequestDetail] = React.useState<IRequest>();

  const { data, size, setSize, mutate, isValidating } = useSWRInfinite(
    (pageIndex) => [API_PATHS.getUnconfirmed, pageIndex, accept],
    async (url, pageIndex, accept) => {
      const res = await dispatch(fetchThunk(url, 'post', { offset: pageIndex * PAGE_SIZE, accept }));
      if (res.status !== SUCCESS_CODE) {
        throw new Error(res.status);
      }

      if (res.body.requests.length < PAGE_SIZE) {
        setShowLoadMore(false);
      } else {
        setShowLoadMore(true);
      }

      return {
        requests: res.body.requests,
        pageIndex,
      };
    },
  );

  const onSubmit = React.useCallback(async () => {
    if (!requestDetail) {
      return;
    }

    dispatch(setLoadingBackDrop(true));

    await dispatch(confirmRequest(requestDetail));

    dispatch(setLoadingBackDrop(false));

    mutate();

    setShowDialog(false);
  }, [dispatch, mutate, requestDetail]);

  return (
    <React.Fragment>
      <UnconfirmedRequestBox
        isValidating={isValidating}
        size={size}
        data={data}
        accept={accept}
        showLoadMore={showLoadMore}
        onLoadMore={() => setSize(size + 1)}
        onConfirm={(value) => {
          setRequestDetail(value);
          setShowDialog(true);
        }}
        onViewRequestDetail={(data) => dispatch(push(ROUTES.requestDetail, { detail: data }))}
      />

      <ConfirmAcceptedRequestDialog open={showDialog} onClose={() => setShowDialog(false)} onSubmit={onSubmit} />
    </React.Fragment>
  );
};

export default UnconfirmedRequestTab;
