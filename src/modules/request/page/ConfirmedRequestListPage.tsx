import * as React from 'react';
import { useIntl } from 'react-intl';
import { PageWrapper } from '../../common/component/elements';
import HeaderTab from '../../common/component/HeaderTab';
import { RATING_TAB_INDEX } from '../../rating/constants';
import ConfirmedRequestListBox from '../component/ConfirmedRequestListBox';

interface IRatingListPageProps {}

const ConfirmedRequestListPage: React.FunctionComponent<IRatingListPageProps> = (props) => {
  const intl = useIntl();
  const [tabIndex, setTabIndex] = React.useState(RATING_TAB_INDEX.PENDING);

  return (
    <PageWrapper>
      <HeaderTab
        tabIndex={tabIndex}
        tabList={[intl.formatMessage({ id: 'rating.PENDDING' }), intl.formatMessage({ id: 'rating.RATED' })]}
        onChangeTab={(newIndex) => setTabIndex(newIndex)}
      />

      {tabIndex === RATING_TAB_INDEX.PENDING ? (
        <ConfirmedRequestListBox mode={'unrated'} />
      ) : (
        <ConfirmedRequestListBox mode={'rated'} />
      )}
    </PageWrapper>
  );
};

export default ConfirmedRequestListPage;
