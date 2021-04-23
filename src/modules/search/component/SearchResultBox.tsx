import { Box, Button, Chip, Grow, List, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { ISeller, ISellerSearchFilter } from '../model';
import SearchResultItem from './SearchResultItem';
import { ReactComponent as NoDataIcon } from '../../../svg/ic_nodata.svg';
import SearchResultSkeleton from './SearchResultSkeleton';
import { some } from '../../common/constants';

interface Props {
  loading: boolean;
  disableLoadMore: boolean;
  filter: ISellerSearchFilter;
  data?: some[];
  onSelectSeller(seller: ISeller): void;
  loadMore(): void;
}

const SearchResultBox = (props: Props) => {
  const { loading, disableLoadMore, filter, data, onSelectSeller, loadMore } = props;

  return (
    <>
      <Box display="flex" margin="12px 24px 10px" alignItems="center">
        <Typography variant="body1" style={{ flex: 1 }}>
          <FormattedMessage id="resultFor" />
          &nbsp; “{filter?.string}”
        </Typography>
        <Chip
          label={<FormattedNumber value={data?.length || 0} />}
          color="primary"
          style={{ height: '24px', minWidth: '56px' }}
        />
      </Box>

      {!data?.length && !loading && (
        <Box display="flex" flexDirection="column" alignItems="center" padding="48px">
          <NoDataIcon />
          <Typography variant="body2" color="textSecondary" style={{ textAlign: 'center', paddingTop: '16px' }}>
            <FormattedMessage
              id="search.nodata"
              values={{
                text: (
                  <Typography variant="body2" color="textPrimary" component="span">
                    {filter.string}
                  </Typography>
                ),
              }}
            />
          </Typography>
        </Box>
      )}

      <Box flex={1}>
        <List style={{ margin: '0 24px' }}>
          {data?.map((page) =>
            page.searchData?.map((one: ISeller) => (
              <Grow in key={one.id}>
                <SearchResultItem key={one.id} info={one} onSelect={() => onSelectSeller(one)} />
              </Grow>
            )),
          )}
        </List>
      </Box>

      {loading ? (
        <div
          style={{
            flex: 1,
            padding: '0 24px',
          }}
        >
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
        </div>
      ) : (
        !!data?.length && (
          <Box padding="0 0 72px" display="flex" justifyContent="center">
            <Button
              disabled={disableLoadMore}
              fullWidth
              variant="outlined"
              color="primary"
              size="small"
              style={{ width: '96px', height: '24px' }}
              onClick={loadMore}
            >
              <FormattedMessage id="search.seeMore" />
            </Button>
          </Box>
        )
      )}
    </>
  );
};

export default SearchResultBox;
