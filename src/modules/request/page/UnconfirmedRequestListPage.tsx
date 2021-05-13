import * as React from 'react';
import { useIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { PageWrapper } from '../../common/component/elements';
import HeaderTab from '../../common/component/HeaderTab';
import AcceptedRequestTab from '../component/acceptedRequest/AcceptedRequestTab';
import RequestingTab from '../component/requesting/RequestingTab';
import { UNCONFIRMED_REQUEST_TAB_INDEX } from '../constants';
import { setUnconfirmedRequestTabIndex } from '../redux/requestReducer';

interface IRequestListPageProps {}

const UnconfirmedRequestListPage: React.FunctionComponent<IRequestListPageProps> = (props) => {
  const dispatch = useDispatch();

  const intl = useIntl();

  const { tabIndex } = useSelector(
    (state: AppState) => ({
      tabIndex: state.request.unconfirmedRequestTabIndex,
    }),
    shallowEqual,
  );

  return (
    <PageWrapper>
      <HeaderTab
        tabIndex={tabIndex}
        tabList={[intl.formatMessage({ id: 'request.requesting' }), intl.formatMessage({ id: 'request.received' })]}
        onChangeTab={(newIndex) => dispatch(setUnconfirmedRequestTabIndex(newIndex))}
      />

      {tabIndex === UNCONFIRMED_REQUEST_TAB_INDEX.REQUESTING ? <RequestingTab /> : <AcceptedRequestTab />}
    </PageWrapper>
  );
};

export default UnconfirmedRequestListPage;
