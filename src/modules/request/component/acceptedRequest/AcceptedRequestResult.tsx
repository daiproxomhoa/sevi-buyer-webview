import { Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { ROUTES } from '../../../../configs/routes';
import { CardDiv } from '../../../common/component/elements';
import { RawLink } from '../../../common/component/Link';
import { IAcceptRequest } from '../../model';
import ResultItemInfo from '../ResultItemInfo';

interface Props {
  info: IAcceptRequest;
  onConfirm(val: IAcceptRequest): void;
}

const AcceptedRequestResult = (props: Props) => {
  const { info, onConfirm } = props;

  return (
    <CardDiv>
      <ResultItemInfo info={info} />

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '8px',
        }}
      >
        <RawLink
          to={ROUTES.chat.gen(info.buyerId, info.sellerId, info.createDate)}
          style={{ marginRight: '4px', flex: 1 }}
        >
          <Button fullWidth variant="outlined" color="primary" size="small">
            <FormattedMessage id="conversation" />
          </Button>
        </RawLink>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: '4px', flex: 1 }}
          onClick={() => onConfirm(info)}
        >
          <FormattedMessage id="confirm" />
        </Button>
      </div>
    </CardDiv>
  );
};

export default AcceptedRequestResult;
