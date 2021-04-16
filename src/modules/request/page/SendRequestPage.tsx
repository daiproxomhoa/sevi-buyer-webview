import { go, goBack } from "connected-react-router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { SUCCESS_CODE } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import Header from "../../common/component/Header";
import { setLoadingBackDrop } from "../../common/redux/commonReducer";
import RequestResultDialog from "../component/sendRequest/RequestResultDialog";
import SendRequestForm from "../component/sendRequest/SendRequestForm";
import {
  ICreateRequest,
  ICreateRequestForm,
  ICreateRequestResult,
} from "../model";
import { createRequest, setDescription } from "../redux/requestReducer";

interface Props {}

const SendRequestPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();
  const location = useLocation();

  const { profile, locale, description, sessionStamp } = useSelector(
    (state: AppState) => ({
      profile: state.profile.data,
      locale: state.intl.locale,
      description: state.request.description,
      sessionStamp: state.search.sessionStamp,
    }),
    shallowEqual
  );

  const [result, setResult] = React.useState<ICreateRequestResult>();
  const [openDialog, setOpenDialog] = React.useState<boolean>(false);

  const onSubmit = React.useCallback(
    async (values: ICreateRequestForm) => {
      const searchParams = new URLSearchParams(location.search);

      const sellerId = searchParams.get("id");

      if (!sellerId) {
        return;
      }

      const params: ICreateRequest = {
        sellerId,
        sessionStamp,
        date: values.date,
        location: values.location,
        desc: values.desc,
        time: `${values.time}:00`,
      };

      dispatch(setLoadingBackDrop(true));

      const json = await dispatch(createRequest(params));

      dispatch(setLoadingBackDrop(false));

      if (json?.status === SUCCESS_CODE) {
        setResult(json.body);
        setOpenDialog(true);
      }
    },
    [dispatch, location.search, sessionStamp]
  );

  return (
    <PageWrapper>
      <Header
        title={<FormattedMessage id="request.sendRequest" />}
        action={() => dispatch(goBack())}
      />

      <SendRequestForm
        profile={profile}
        description={description}
        locale={locale}
        onUpdateDescription={(str: string) => dispatch(setDescription(str))}
        onSubmit={onSubmit}
      />

      <RequestResultDialog
        open={openDialog}
        result={result}
        onClose={() => setOpenDialog(false)}
        backToSearch={() => {
          setOpenDialog(false);
          dispatch(go(-2));
        }}
      />
    </PageWrapper>
  );
};

export default SendRequestPage;
