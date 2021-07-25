import { Box, Button, Divider, Grow, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { API_PATHS } from '../../../configs/api';
import { LIGHT_GREY } from '../../../configs/colors';
import { ROUTES } from '../../../configs/routes';
import { RawLink } from '../../common/component/Link';
import ProgressiveImage from '../../common/component/ProgressiveImage';
import { getFullName } from '../../rating/utils';
import { IRequest } from '../model';

interface Props {
  info: IRequest;
  onViewRequestDetail(): void;
  onConfirm(val: IRequest): void;
}

const ResultItemInfo = (props: Props) => {
  const { info, onViewRequestDetail, onConfirm } = props;

  return (
    <Grow in>
      <Box
        style={{
          borderRadius: '12px',
          marginTop: '12px',
          backgroundColor: LIGHT_GREY,
          justifyContent: 'flex-start',
          padding: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
        onClick={onViewRequestDetail}
      >
        <Box display="flex" alignItems="center" width="100%">
          <Typography
            variant="subtitle2"
            style={{ flex: 1, textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', marginRight: '8px' }}
          >
            {info.desc}
          </Typography>
        </Box>
        <Divider style={{ margin: '8px 0', width: '100%' }} />

        <Box display="flex" alignItems="center" width="100%">
          <Box display="flex" alignItems="center" flex={1}>
            <ProgressiveImage
              alt={info.seller.givenName}
              src={API_PATHS.renderSellerAvatar(info.seller.id, info.seller.avatar)}
              style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover', marginRight: '8px' }}
            />

            <Typography variant="caption">{getFullName(info.seller)}</Typography>
          </Box>

          <Typography variant="caption" color="textSecondary">
            {info.createDate}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" width="100%" paddingTop="8px">
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
            style={{
              flex: 1,
              marginRight: info.accept ? '4px' : undefined,
            }}
          >
            <Button
              style={{ fontWeight: info.buyerUnread ? 600 : 'unset' }}
              variant="outlined"
              color="primary"
              size="small"
              fullWidth
            >
              <FormattedMessage id="conversation" />
            </Button>
          </RawLink>

          {info.accept && (
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="small"
              style={{ marginLeft: '4px', flex: 1 }}
              onClick={(e) => {
                e.stopPropagation();
                onConfirm(info);
              }}
            >
              <FormattedMessage id="confirm" />
            </Button>
          )}
        </Box>
      </Box>
    </Grow>
  );
};

export default ResultItemInfo;
