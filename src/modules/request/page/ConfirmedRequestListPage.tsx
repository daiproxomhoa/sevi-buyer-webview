import * as React from 'react';
import { useIntl } from 'react-intl';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../../redux/reducer';
import { PageWrapper } from '../../common/component/elements';
import HeaderTab from '../../common/component/HeaderTab';
import ConfirmedRequestListBox from '../component/ConfirmedRequestListBox';
import { CONFIRMED_REQUEST_TAB_INDEX } from '../constants';
import { setConfirmedRequestTabIndex } from '../redux/requestReducer';

interface IRatingListPageProps {}

const ConfirmedRequestListPage: React.FunctionComponent<IRatingListPageProps> = (props) => {
  const dispatch = useDispatch();

  const intl = useIntl();

  const { tabIndex } = useSelector(
    (state: AppState) => ({
      tabIndex: state.request.confirmedRequestTabIndex,
    }),
    shallowEqual,
  );

  return (
    <PageWrapper>
      <HeaderTab
        tabIndex={tabIndex}
        tabList={[intl.formatMessage({ id: 'rating.PENDING' }), intl.formatMessage({ id: 'rating.RATED' })]}
        onChangeTab={(newIndex) => dispatch(setConfirmedRequestTabIndex(newIndex))}
      />

      {tabIndex === CONFIRMED_REQUEST_TAB_INDEX.UN_RATED ? (
        <ConfirmedRequestListBox mode={'unrated'} />
      ) : (
        <ConfirmedRequestListBox mode={'rated'} />
      )}
    </PageWrapper>
  );
};

export default ConfirmedRequestListPage;
