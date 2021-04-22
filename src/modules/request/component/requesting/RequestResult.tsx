import { Box } from '@material-ui/core';
import React from 'react';
import { LIGHT_GREY } from '../../../../configs/colors';
import { IRequest } from '../../model';
import ResultItemInfo from '../ResultItemInfo';

interface Props {
  info: IRequest;
  onViewRequestDetail(): void;
}

const RequestResult = (props: Props) => {
  const { info, onViewRequestDetail } = props;

  return (
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
      <ResultItemInfo info={info} />
    </Box>
  );
};

export default RequestResult;
