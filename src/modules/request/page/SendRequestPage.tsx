import { goBack } from "connected-react-router";
import moment from "moment";
import React from "react";
import { FormattedMessage } from "react-intl";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Action } from "redux";
import { ThunkDispatch } from "redux-thunk";
import { TIME_FORMAT } from "../../../constants";
import { AppState } from "../../../redux/reducer";
import { PageWrapper } from "../../common/component/elements";
import Header from "../../common/component/Header";
import SendRequestForm from "../component/sendRequest/SendRequestForm";
import { ICreateRequest, ICreateRequestForm } from "../model";
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
    })
  );

  const onSubmit = React.useCallback(
    (values: ICreateRequestForm) => {
      const searchParams = new URLSearchParams(location.search);

      const sellerId = searchParams.get("id");

      if (!sellerId) {
        return;
      }

      const requestTime = moment(values.time, TIME_FORMAT);

      const params: ICreateRequest = {
        sellerId,
        sessionStamp,
        date: values.date,
        location: values.location,
        desc: values.desc,
        time: {
          hour: requestTime.hours(),
          minute: requestTime.minutes(),
          second: 0,
          nano: 0,
        },
      };

      dispatch(createRequest(params));
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
    </PageWrapper>
  );
};

export default SendRequestPage;
