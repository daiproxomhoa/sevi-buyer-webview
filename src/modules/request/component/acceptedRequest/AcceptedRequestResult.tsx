import { Button } from '@material-ui/core';
import React from 'react';
import { FormattedMessage } from 'react-intl';
import { CardDiv } from '../../../common/component/elements';
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
        <Button fullWidth variant="outlined" color="secondary" size="small" style={{ marginRight: '4px' }}>
          <FormattedMessage id="conversation" />
        </Button>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          size="small"
          style={{ marginLeft: '4px' }}
          onClick={() => onConfirm(info)}
        >
          <FormattedMessage id="confirm" />
        </Button>
      </div>
    </CardDiv>
  );
};

export default AcceptedRequestResult;
