import * as React from 'react';
import { useState } from 'react';
import { useIntl } from 'react-intl';
import { PageWrapper } from '../../common/component/elements';
import HeaderTab from '../../common/component/HeaderTab';
import { REQUEST_TAB_INDEX } from '../constants';
import AcceptedRequestTab from '../component/acceptedRequest/AcceptedRequestTab';
import RequestingTab from '../component/requesting/RequestingTab';

interface IRequestListPageProps {}

const RequestListPage: React.FunctionComponent<IRequestListPageProps> = (props) => {
  const intl = useIntl();
  const [tabIndex, setTabIndex] = useState(REQUEST_TAB_INDEX.REQUESTING);

  return (
    <PageWrapper>
      <HeaderTab
        tabIndex={tabIndex}
        tabList={[intl.formatMessage({ id: 'request.requesting' }), intl.formatMessage({ id: 'request.received' })]}
        onChangeTab={(newIndex) => setTabIndex(newIndex)}
      />

      {tabIndex === REQUEST_TAB_INDEX.REQUESTING ? <RequestingTab /> : <AcceptedRequestTab />}
    </PageWrapper>
  );
};

export default RequestListPage;
