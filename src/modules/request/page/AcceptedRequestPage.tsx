import React, { useCallback } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import ReceivedBox from "../component/ReceivedBox";
import { fetchAcceptedRequest, setAcceptedData } from "../redux/requestReducer";

interface Props {}

const AcceptedRequestPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { acceptedData } = useSelector(
    (state: AppState) => ({
      acceptedData: state.request.acceptedData,
    }),
    shallowEqual
  );

  const [showLoadMore, setShowLoadMore] = React.useState(true);
  const [loading, setLoading] = React.useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(fetchAcceptedRequest());

    setLoading(false);
    if (json?.status === SUCCESS_CODE) {
      dispatch(setAcceptedData(json?.body?.requests));

      if (json?.body?.requests?.length < 10) {
        setShowLoadMore(false);
      }
    }
  }, [dispatch]);

  React.useEffect(() => {
    fetchData();

    return () => {
      dispatch(setAcceptedData([]));
    };
  }, [dispatch, fetchData]);

  return (
    <ReceivedBox
      loading={loading}
      acceptedData={acceptedData}
      showLoadMore={showLoadMore}
      onLoadMore={() => fetchData()}
    />
  );
};

export default AcceptedRequestPage;
