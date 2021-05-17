import { Button, Dialog, Divider, Theme, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { SlideUp } from '../../../common/component/elements';
import { some } from '../../../common/constants';
import { ISellerSearchFilter } from '../../model';
import MenuSortBy from './MenuSortBy';
import SelectAddress from './SelectAddress';
import SlideRadius from './SlideRadius';

const FilterDialog = withStyles((theme: Theme) => ({
  root: {},
  scrollPaper: {
    alignItems: 'flex-end',
  },
}))(Dialog);

interface Props {
  filter: ISellerSearchFilter;
  profile?: some;
  open: boolean;
  onClose(): void;
  onFilter(data: ISellerSearchFilter): void;
  onAddNewAddress(): void;
}

const FilterBox = (props: Props) => {
  const { filter, profile, open, onClose, onFilter, onAddNewAddress } = props;
  const [filterTmp, setFilterTmp] = React.useState(props.filter);

  React.useEffect(() => {
    setFilterTmp(filter);
  }, [filter]);

  return (
    <FilterDialog
      open={open}
      TransitionComponent={SlideUp}
      style={{
        alignItems: 'flex-end',
      }}
      PaperProps={{
        style: {
          padding: '12px 24px 24px',
          margin: 0,
          width: '100%',
          borderRadius: '16px 16px 0 0',
        },
      }}
      onBackdropClick={() => {
        setFilterTmp(filter);
        onClose();
      }}
    >
      <div
        style={{
          display: 'flex',
          paddingBottom: '12px',
          justifyContent: 'flex-end',
        }}
      >
        <Button onClick={() => onFilter(filterTmp)} size="small">
          <Typography variant="body1" color="primary" style={{ fontWeight: 500, padding: 6 }}>
            <FormattedMessage id="confirm" />
          </Typography>
        </Button>
      </div>
      <SelectAddress
        profile={profile}
        filter={filterTmp}
        setFilter={(data) => setFilterTmp(data)}
        onAddNewAddress={onAddNewAddress}
      />

      <SlideRadius filter={filterTmp} setFilter={(data) => setFilterTmp(data)} />

      <Divider style={{ width: '100%' }} />

      <MenuSortBy filter={filterTmp} setFilter={(data) => setFilterTmp(data)} />
    </FilterDialog>
  );
};

export default FilterBox;
