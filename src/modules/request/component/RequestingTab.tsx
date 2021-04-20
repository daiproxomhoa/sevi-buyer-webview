import React, { useCallback } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import useSWR, { useSWRInfinite } from 'swr';
import { API_PATHS } from '../../../configs/api';
import { SUCCESS_CODE } from '../../../constants';
import { AppState } from '../../../redux/reducer';
import RequestInfoDetail from './RequestInfoDetail';
import RequestingBox from './RequestingBox';
import { IRequest } from '../model';
import { fetchRequesting } from '../redux/requestReducer';

interface Props {}

const RequestingPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  const [requestInfo, setRequestInfo] = React.useState<IRequest>();
  const [showLoadMore, setShowLoadMore] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [showInfoDetail, setShowInfoDetail] = React.useState(false);

  const { data, size, setSize } = useSWRInfinite(
    () => API_PATHS.getUnconfirmed,
    async () => {
      if (size === 1 && !data?.[0].length) {
        setLoading(true);
      }

      const json = await dispatch(fetchRequesting(size - 1));
      setLoading(false);
      if (json?.status === SUCCESS_CODE) {
        if (json?.body?.requests?.length < 10) {
          setShowLoadMore(false);
        }
        return json?.body?.requests;
      }
    },
  );

  return (
    <>
      <RequestingBox
        loading={loading}
        data={data}
        showLoadMore={showLoadMore}
        onLoadMore={() => setSize(size + 1)}
        onViewRequestDetail={(data) => {
          setRequestInfo(data);
          setShowInfoDetail(true);
        }}
      />

      <RequestInfoDetail
        open={showInfoDetail}
        info={requestInfo}
        onClose={() => setShowInfoDetail(false)}
        onExited={() => setRequestInfo(undefined)}
      />
    </>
  );
};

export default RequestingPage;
