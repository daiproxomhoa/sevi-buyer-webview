import { goBack } from "connected-react-router";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch } from "react-redux";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import Header from "../../common/component/Header";
import SendRequestForm from "../component/sendRequest/SendRequestForm";

interface Props {}

const SendRequestPage = (props: Props) => {
  const dispatch = useDispatch<ThunkDispatch<AppState, null, Action<string>>>();

  return (
    <PageWrapper>
      <Header
        title={<FormattedMessage id="request.sendRequest" />}
        action={() => dispatch(goBack())}
      />

      <SendRequestForm />
    </PageWrapper>
  );
};

export default SendRequestPage;
