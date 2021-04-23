import { Avatar, Box, Button, Divider, Typography } from '@material-ui/core';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { CardDiv } from '../../common/component/elements';
import { RawLink } from '../../common/component/Link';
import { some } from '../../common/constants';
import { getFullName } from '../../rating/utils';

interface Props {
  request: some;
  mode: 'rated' | 'unrated';
}

const PendingRateResultCard = (props: Props) => {
  const { request = {}, mode } = props;
  const { seller, desc, createDate } = request;

  return (
    <CardDiv>
      {desc && (
        <>
          <Typography variant="subtitle2">{desc}</Typography>
          <Divider style={{ margin: '8px 0' }} />
        </>
      )}
      <Box className="d-flex justify-content-between align-items-center m-t-4 m-b-4">
        <Avatar
          alt={seller.givenName}
          src={API_PATHS.renderSellerAvatar(seller.id, seller.avatar)}
          style={{ width: '28px', height: '28px', marginRight: '8px' }}
        />
        <Box className="flex-1">
          <Typography variant="caption">{getFullName(seller)}</Typography>
        </Box>
        {mode === 'unrated' ? (
          <RawLink to={ROUTES.review.gen(seller?.id, createDate)}>
            <Button variant="contained" color="primary" size="small" style={{ minWidth: 136 }}>
              <GradeRoundedIcon style={{ width: '16px', height: '16px', marginRight: '6px' }} />
              <FormattedMessage id="rating.RATENOW" />
            </Button>
          </RawLink>
        ) : (
          <Rating readOnly value={0} size="small" />
        )}
      </Box>
      {mode === 'rated' && (
        <Button fullWidth variant="contained" color="primary" size="small" className={'m-t-8'}>
          <FormattedMessage id="rating.REQUEST_AGAIN" />
        </Button>
      )}
    </CardDiv>
  );
};

export default PendingRateResultCard;
