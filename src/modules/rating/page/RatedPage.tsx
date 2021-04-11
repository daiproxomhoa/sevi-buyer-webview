import { useSnackbar } from "notistack";
import React, { useCallback, useEffect, useState } from "react";
import { useIntl } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { API_PATHS } from "../../../configs/api";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import {
  PageWrapperNoScroll,
  snackbarSetting,
} from "../../common/component/elements";
import { some } from "../../common/constants";
import { fetchThunk } from "../../common/redux/thunk";
import RatedBox from "../component/RatedBox";

interface Props {}

const RatedPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const intl = useIntl();
  const [data, setData] = useState<some[]>([]);
  const [page, setPage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const json = await dispatch(
      fetchThunk(
        API_PATHS.updateProfile,
        "post",
        JSON.stringify({ offset: page })
      )
    );
    if (json.status === SUCCESS_CODE) {
      setData((one) => ({ ...(one || []), ...json.body }));
    } else {
      enqueueSnackbar(
        intl.formatMessage({ id: "getDataFail" }),
        snackbarSetting((key) => closeSnackbar(key), { color: "error" })
      );
    }
    setLoading(false);
  }, [closeSnackbar, dispatch, enqueueSnackbar, intl, page]);

  useEffect(() => {
    fetchData();
  }, [dispatch, fetchData]);

  return (
    <PageWrapperNoScroll>
      <RatedBox
        data={data}
        setPage={() => setPage((one) => one + 1)}
        loading={loading}
      />
    </PageWrapperNoScroll>
  );
};

export default RatedPage;
