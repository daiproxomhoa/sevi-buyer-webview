import { Avatar, Box, Button, Divider, Typography } from '@material-ui/core';
import Rating from '@material-ui/lab/Rating';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { CardDiv } from '../../common/component/elements';
import { some } from '../../common/constants';
import RatingCardSkeleton from '../../rating/component/RatingCardSkeleton';
import { getFullName } from '../../rating/utils';

interface Props {
  data?: some;
  loading?: boolean;
  disableLoadMore?: boolean;
  setPage: () => void;
}
const MyReviewsBox = (props: Props) => {
  const { data, loading, setPage, disableLoadMore } = props;

  return (
    <>
      {data?.ratings?.map((review: some, index: number) => {
        const { desc, seller = {}, rating } = review;
        return (
          <CardDiv>
            {desc && (
              <>
                <Typography variant="subtitle2">{desc}</Typography>
                <Divider className="m-t-8 m-b-8" />
              </>
            )}
            <Box className="d-flex justify-content-between align-items-center m-t-4 m-b-4">
              <Avatar
                alt={seller?.givenName}
                src={API_PATHS.renderSellerAvatar(seller?.id, seller?.avatar)}
                style={{ width: '28px', height: '28px', marginRight: '8px' }}
              />
              <Box className="flex-1">
                <Typography variant="caption">{getFullName(seller)}</Typography>
              </Box>
              <Rating value={rating} size="small" />
            </Box>
          </CardDiv>
        );
      })}

      {!data || loading ? (
        <>
          {Array(2)
            .fill(0)
            .map((value: some, index: number) => {
              return <RatingCardSkeleton key={index} />;
            })}
        </>
      ) : (
        <Box className="d-flex justify-content-center justify-content-center">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{
              marginBottom: 80,
              marginTop: 16,
              padding: '0px 16px',
            }}
            onClick={setPage}
            disabled={disableLoadMore}
          >
            <Typography variant="caption">
              <FormattedMessage id="loadMore" />
            </Typography>
          </Button>
        </Box>
      )}
    </>
  );
};
export default MyReviewsBox;
