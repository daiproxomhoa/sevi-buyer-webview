import { Box, Button, Divider, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { ROUTES } from '../../../configs/routes';
import { RawLink } from '../../common/component/Link';
import ProgressiveImage from '../../common/component/ProgressiveImage';
import { IRequest } from '../model';

interface Props {
  info: IRequest;
}

const ResultItemInfo = (props: Props) => {
  const { info } = props;

  return (
    <>
      <Box display="flex" alignItems="center" width="100%">
        <Typography
          variant="subtitle2"
          style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginRight: '8px' }}
        >
          {info.desc}
        </Typography>
        {!info.accept && (
          <Typography variant="caption" color="textSecondary">
            {info.createDate}
          </Typography>
        )}
      </Box>
      <Divider style={{ margin: '8px 0', width: '100%' }} />

      <Box display="flex" alignItems="center" width="100%">
        <Box display="flex" alignItems="center" flex={1}>
          <ProgressiveImage
            alt={info.seller.givenName}
            src={API_PATHS.renderSellerAvatar(info.seller.id, info.seller.avatar)}
            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px' }}
          />

          <Typography variant="caption">
            {info.seller.givenName}&nbsp;{info.seller.familyName}
          </Typography>
        </Box>

        {info.accept ? (
          <Typography variant="caption" color="textSecondary">
            {info.createDate}
          </Typography>
        ) : (
          <RawLink
            to={{
              pathname: ROUTES.chat.gen(
                info.buyerId,
                info.sellerId,
                info.createDate,
                info.seller.avatar,
                info.seller.givenName,
              ),
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Button variant="contained" color="primary" size="small">
              <FormattedMessage id="conversation" />
            </Button>
          </RawLink>
        )}
      </Box>
    </>
  );
};

export default ResultItemInfo;
