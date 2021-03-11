import * as React from "react";
import { useState } from "react";
import { PageWrapperNoScroll } from "../../common/component/elements";
import HeaderTab from "../component/HeaderTab";
import ReceivedBox from "../component/ReceivedBox";
import RequestingBox from "../component/RequestingBox";
import { REQUEST_TAB_INDEX } from "../constants";

interface IRequestListPageProps {}

const RequestListPage: React.FunctionComponent<IRequestListPageProps> = (
  props
) => {
  const [tabIndex, setTabIndex] = useState(REQUEST_TAB_INDEX.REQUESTING);

  return (
    <PageWrapperNoScroll>
      <HeaderTab
        tabIndex={tabIndex}
        onChangeTab={(newIndex) => setTabIndex(newIndex)}
      />

      {tabIndex === REQUEST_TAB_INDEX.REQUESTING ? (
        <RequestingBox />
      ) : (
        <ReceivedBox />
      )}
    </PageWrapperNoScroll>
  );
};

export default RequestListPage;
