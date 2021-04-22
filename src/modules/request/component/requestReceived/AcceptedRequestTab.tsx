import React from 'react';
import { useDispatch } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { useSWRInfinite } from 'swr';
import { SUCCESS_CODE } from '../../../../constants';
import { AppState } from '../../../../redux/reducer';
import { REQUEST_PAGE_SIZE } from '../../constants';
import { fetchUnconfirmed } from '../../redux/requestReducer';
import ReceivedBox from './ReceivedBox';

interface Props {}

const AcceptedRequestPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [showLoadMore, setShowLoadMore] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const { data, size, setSize } = useSWRInfinite(
    () => 'fetchAcceptedRequest',
    async () => {
      if (size === 1 && !data?.[0].length) {
        setLoading(true);
      }

      const json = await dispatch(fetchUnconfirmed((size - 1) * REQUEST_PAGE_SIZE, true));
      setLoading(false);
      if (json?.status === SUCCESS_CODE) {
        if (json?.body?.requests?.length < 10) {
          setShowLoadMore(false);
        }
        return json?.body?.requests;
      }
    },
  );

  return <ReceivedBox loading={loading} data={data} showLoadMore={showLoadMore} onLoadMore={() => setSize(size + 1)} />;
};

export default AcceptedRequestPage;
