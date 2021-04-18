import { push } from "connected-react-router";
import React, { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { ROUTES } from "../../../configs/routes";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import RequestInfoDetail from "../component/RequestInfoDetail";
import RequestingBox from "../component/RequestingBox";
import { IRequest } from "../model";
import { fetchRequesting, setRequestingData } from "../redux/requestReducer";

interface Props {}

const RequestingPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { requestingData } = useSelector(
    (state: AppState) => ({
      requestingData: state.request.requestingData,
    }),
    shallowEqual
  );

  const [requestInfo, setRequestInfo] = React.useState<IRequest>();
  const [showLoadMore, setShowLoadMore] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [showInfoDetail, setShowInfoDetail] = React.useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchRequesting());

    setLoading(false);
    if (json?.status === SUCCESS_CODE) {
      dispatch(setRequestingData(json?.body?.requests));
      if (json?.body?.requests?.length < 10) {
        setShowLoadMore(false);
      }
    }
  }, [dispatch]);

  React.useEffect(() => {
    fetchData();

    return () => {
      dispatch(setRequestingData([]));
    };
  }, [dispatch, fetchData]);

  return (
    <>
      <RequestingBox
        loading={loading}
        requestingData={requestingData}
        showLoadMore={showLoadMore}
        onLoadMore={() => fetchData()}
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
