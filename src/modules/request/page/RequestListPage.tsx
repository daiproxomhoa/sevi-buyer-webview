import * as React from "react";
import { PageWrapperNoScroll } from "../../common/component/elements";
import HeaderTab from "../component/HeaderTab";
import ReceivedBox from "../component/ReceivedBox";
import RequestingBox from "../component/RequestingBox";

interface IRequestListPageProps {}

const RequestListPage: React.FunctionComponent<IRequestListPageProps> = (
  props
) => {
  return (
    <PageWrapperNoScroll>
      <HeaderTab />

      <RequestingBox />

      {/* <ReceivedBox /> */}
    </PageWrapperNoScroll>
  );
};

export default RequestListPage;
