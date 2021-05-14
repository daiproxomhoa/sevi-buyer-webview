import { Box, Typography } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CardDiv } from '../../common/component/elements';
import { getFullName } from '../../rating/utils';
import { IRequest } from '../model';

interface Props {
  info: IRequest;
}

const RequestInfoDetailBox = (props: Props) => {
  const { info } = props;

  return (
    <Box padding="12px 24px 24px">
      <CardDiv>
        <Typography variant="caption" color="textSecondary">
          <FormattedMessage id="request.detail.time" />
        </Typography>
        <Typography variant="body2">
          {info?.date}&nbsp;{info?.time}
        </Typography>
      </CardDiv>

      <CardDiv>
        <Typography variant="caption" color="textSecondary">
          <FormattedMessage id="request.detail.note" />
        </Typography>
        <Typography variant="body2">{info?.desc}</Typography>
      </CardDiv>

      <Typography variant="subtitle1" style={{ paddingTop: '12px' }}>
        <FormattedMessage id="request.detail.contactInfo" />
      </Typography>

      <CardDiv>
        <Typography variant="caption" color="textSecondary">
          <FormattedMessage id="request.detail.fullName" />
        </Typography>
        <Typography variant="body2">{getFullName(info?.seller)}</Typography>
      </CardDiv>

      <CardDiv>
        <Typography variant="caption" color="textSecondary">
          <FormattedMessage id="phoneNumber" />
        </Typography>
        <Typography variant="body2">{info?.sellerId}</Typography>
      </CardDiv>
    </Box>
  );
};

export default RequestInfoDetailBox;
