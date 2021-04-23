import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { trigger, useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../../configs/api';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducer';
import { setLoadingBackDrop } from '../../../common/redux/commonReducer';
import { fetchThunk } from '../../../common/redux/thunk';
import { IAcceptRequest } from '../../model';
import { confirmRequest } from '../../redux/requestReducer';
import AcceptedRequestBox from './AcceptedRequestBox';
import ConfirmAcceptedRequestDialog from './ConfirmAcceptedRequestDialog';

interface Props {}
const PAGE_SIZE = 20;

const AcceptedRequestPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [showLoadMore, setShowLoadMore] = React.useState(false);
  const [showDialog, setShowDialog] = React.useState<boolean>(false);
  const [requestDetail, setRequestDetail] = React.useState<IAcceptRequest>();

  const onSubmit = React.useCallback(async () => {
    if (!requestDetail) {
      return;
    }

    dispatch(setLoadingBackDrop(true));

    await dispatch(confirmRequest(requestDetail));

    dispatch(setLoadingBackDrop(false));

    trigger(API_PATHS.getUnconfirmed);

    setShowDialog(false);
  }, [dispatch, requestDetail]);

  const { data, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex) => [API_PATHS.getUnconfirmed, pageIndex, true],
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

  return (
    <React.Fragment>
      <AcceptedRequestBox
        loading={isValidating && size !== data?.length}
        data={data}
        showLoadMore={showLoadMore}
        onLoadMore={() => setSize(size + 1)}
        onConfirm={(value) => {
          setRequestDetail(value);
          setShowDialog(true);
        }}
      />

      <ConfirmAcceptedRequestDialog open={showDialog} onClose={() => setShowDialog(false)} onSubmit={onSubmit} />
    </React.Fragment>
  );
};

export default AcceptedRequestPage;
