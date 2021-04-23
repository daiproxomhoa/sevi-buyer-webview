import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../../configs/api';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducer';
import { fetchThunk } from '../../../common/redux/thunk';
import ReceivedBox from './ReceivedBox';

interface Props {}
const PAGE_SIZE = 20;

const AcceptedRequestPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [showLoadMore, setShowLoadMore] = React.useState(true);
  const { data, size, setSize, isValidating } = useSWRInfinite(
    (pageIndex) => [API_PATHS.getUnconfirmed, pageIndex, true],
    async (url, pageIndex, accept) => {
      const res = await dispatch(fetchThunk(url, 'post', { offset: pageIndex * PAGE_SIZE, accept }));
      if (res.status !== SUCCESS_CODE) {
        throw new Error(res.status);
      }

      if (res.body.requests.length < PAGE_SIZE) {
        setShowLoadMore(false);
      }

      return {
        requests: res.body.requests,
        pageIndex,
      };
    },
  );

  return (
    <ReceivedBox loading={isValidating} data={data} showLoadMore={showLoadMore} onLoadMore={() => setSize(size + 1)} />
  );
};

export default AcceptedRequestPage;
