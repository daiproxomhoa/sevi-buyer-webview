import { Avatar, Box, Button, Divider, Typography } from '@material-ui/core';
import GradeRoundedIcon from '@material-ui/icons/GradeRounded';
import { Rating } from '@material-ui/lab';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { CardDiv } from '../../common/component/elements';
import { RawLink } from '../../common/component/Link';
import { getFullName } from '../../rating/utils';
import { IRequest } from '../model';

interface Props {
  request: IRequest;
  mode: 'rated' | 'unrated';
  onRequestAgain(): void;
}

const ConfirmedRequestResultCard = (props: Props) => {
  const { request, mode, onRequestAgain } = props;
  const { seller, desc, createDate } = request;

  return (
    <CardDiv>
      {desc && (
        <>
          <Typography variant="subtitle2">{desc}</Typography>
          <Divider style={{ margin: '8px 0' }} />
        </>
      )}

      <Box className="d-flex justify-content-between align-items-center m-t-4">
        <Avatar
          alt={seller.givenName}
          src={API_PATHS.renderSellerAvatar(seller.id, seller.avatar)}
          style={{ width: '28px', height: '28px', marginRight: '8px' }}
        />
        <Box className="flex-1">
          <Typography variant="caption">{getFullName(seller)}</Typography>
        </Box>
        {mode === 'unrated' ? (
          <Typography variant="caption" color="textSecondary">
            {createDate}
          </Typography>
        ) : (
          <Rating readOnly value={0} size="small" />
        )}
      </Box>

      <Box display="flex" alignItems="center" width="100%" paddingTop="8px">
        {mode === 'rated' ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="small"
            className={'m-t-8'}
            onClick={onRequestAgain}
          >
            <FormattedMessage id="rating.REQUEST_AGAIN" />
          </Button>
        ) : (
          <Box display="flex" width="100%">
            <RawLink
              to={{
                pathname: ROUTES.chat.gen(
                  request.buyerId,
                  request.sellerId,
                  request.createDate,
                  request.seller.avatar,
                  request.seller.givenName,
                ),
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              style={{
                flex: 1,
                marginRight: '4px',
              }}
            >
              <Button
                style={{ fontWeight: request.buyerUnread ? 600 : 'unset' }}
                variant="outlined"
                color="primary"
                size="small"
                fullWidth
              >
                <FormattedMessage id="conversation" />
              </Button>
            </RawLink>

            <RawLink
              to={ROUTES.review.gen(seller?.id, createDate)}
              style={{
                flex: 1,
                marginLeft: '4px',
              }}
            >
              <Button variant="contained" color="primary" size="small" fullWidth>
                <GradeRoundedIcon style={{ width: '16px', height: '16px', marginRight: '6px' }} />
                <FormattedMessage id="rating.RATENOW" />
              </Button>
            </RawLink>
          </Box>
        )}
      </Box>
    </CardDiv>
  );
};

export default ConfirmedRequestResultCard;
