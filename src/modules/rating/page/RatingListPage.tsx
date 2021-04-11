import * as React from "react";
import { useIntl } from "react-intl";
import { PageWrapperNoScroll } from "../../common/component/elements";
import HeaderTab from "../../common/component/HeaderTab";
import PendingRateBox from "../component/PendingRateBox";
import { RATING_TAB_INDEX } from "../constants";
import PendingRatePage from "./PendingRatePage";
import RatedPage from "./RatedPage";

interface IRatingListPageProps {}

const RatingListPage: React.FunctionComponent<IRatingListPageProps> = (
  props
) => {
  const intl = useIntl();
  const [tabIndex, setTabIndex] = React.useState(RATING_TAB_INDEX.PENDING);

  return (
    <PageWrapperNoScroll>
      <HeaderTab
        tabIndex={tabIndex}
        tabList={[
          intl.formatMessage({ id: "rating.pending" }),
          intl.formatMessage({ id: "rating.rated" }),
        ]}
        onChangeTab={(newIndex) => setTabIndex(newIndex)}
      />

      {tabIndex === RATING_TAB_INDEX.PENDING ? (
        <PendingRatePage />
      ) : (
        <RatedPage />
      )}
    </PageWrapperNoScroll>
  );
};

export default RatingListPage;
