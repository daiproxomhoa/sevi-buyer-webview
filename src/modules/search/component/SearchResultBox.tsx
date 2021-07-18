import { Box, Button, Chip, List, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ReactComponent as NoDataIcon } from '../../../svg/ic_search_nodata.svg';
import { some } from '../../common/constants';
import { ISeller, ISellerSearchFilter } from '../model';
import SearchResultItem from './SearchResultItem';
import SearchResultSkeleton from './SearchResultSkeleton';

interface Props {
  isValidating: boolean;
  size: number;
  disableLoadMore: boolean;
  filter: ISellerSearchFilter;
  data?: some[];
  onSelectSeller(seller: ISeller): void;
  loadMore(): void;
}

const SearchResultBox = (props: Props) => {
  const { isValidating, disableLoadMore, filter, data, size, onSelectSeller, loadMore } = props;

  return (
    <>
      <Box display="flex" margin="12px 24px 10px" alignItems="center">
        <Typography variant="body1" style={{ flex: 1 }}>
          <FormattedMessage id="resultFor" />
          &nbsp; “{filter?.string}”
        </Typography>
        <Chip
          label={data && data.length > 1 ? '50+' : data ? data[0].searchData.length : 0}
          color="primary"
          style={{ height: '24px', minWidth: '56px' }}
        />
      </Box>

      <List style={{ margin: '0 24px' }}>
        {data?.map((page) =>
          page.searchData?.map((one: ISeller) => (
            <SearchResultItem key={one.id} info={one} onSelect={() => onSelectSeller(one)} />
          )),
        )}
      </List>

      {isValidating && (size !== data?.length || !data[0]?.searchData?.length) ? (
        <Box flex={1} padding="0 24px">
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
          <SearchResultSkeleton />
        </Box>
      ) : data && data[0]?.searchData?.length ? (
        <Box padding="0 0 72px" display="flex" justifyContent="center">
          <Button
            disabled={disableLoadMore}
            fullWidth
            variant="outlined"
            color="primary"
            size="small"
            style={{ minWidth: '96px', height: '24px' }}
            onClick={loadMore}
          >
            <FormattedMessage id="search.seeMore" />
          </Button>
        </Box>
      ) : (
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
    </>
  );
};

export default SearchResultBox;
