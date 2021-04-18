import * as React from "react";
import { useIntl } from "react-intl";
import { PageWrapperNoScroll } from "../../common/component/elements";
import HeaderTab from "../../common/component/HeaderTab";
import { RATING_TAB_INDEX } from "../constants";
import RatingPage from "./RatingPage";

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
          intl.formatMessage({ id: "rating.PENDDING" }),
          intl.formatMessage({ id: "rating.RATED" }),
        ]}
        onChangeTab={(newIndex) => setTabIndex(newIndex)}
      />

      {tabIndex === RATING_TAB_INDEX.PENDING ? (
        <RatingPage mode={"unrated"} />
      ) : (
        <RatingPage mode={"rated"} />
      )}
    </PageWrapperNoScroll>
  );
};

export default RatingListPage;
