import * as React from "react";
import { useState } from "react";
import { useIntl } from "react-intl";
import { PageWrapper } from "../../common/component/elements";
import HeaderTab from "../../common/component/HeaderTab";
import ReceivedBox from "../component/ReceivedBox";
import RequestingBox from "../component/RequestingBox";
import { REQUEST_TAB_INDEX } from "../constants";

interface IRequestListPageProps {}

const RequestListPage: React.FunctionComponent<IRequestListPageProps> = (
  props
) => {
  const intl = useIntl();
  const [tabIndex, setTabIndex] = useState(REQUEST_TAB_INDEX.REQUESTING);

  return (
    <PageWrapper>
      <HeaderTab
        tabIndex={tabIndex}
        tabList={[
          intl.formatMessage({ id: "request.requesting" }),
          intl.formatMessage({ id: "request.received" }),
        ]}
        onChangeTab={(newIndex) => setTabIndex(newIndex)}
      />

      {tabIndex === REQUEST_TAB_INDEX.REQUESTING ? (
        <RequestingBox />
      ) : (
        <ReceivedBox />
      )}
    </PageWrapper>
  );
};

export default RequestListPage;
