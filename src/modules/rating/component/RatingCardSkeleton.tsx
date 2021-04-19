import { Avatar, Box, Button, Divider } from '@material-ui/core';
import { Rating, Skeleton } from '@material-ui/lab';
import React from 'react';
import { CardDiv } from '../../common/component/elements';

interface Props {
  mode?: 'rated' | 'unrated';
}

const RatingCardSkeleton = (props: Props) => {
  const { mode } = props;
  return (
    <CardDiv>
      <Skeleton variant="text" width="50%" style={{ height: 26 }} />
      <Divider className="m-t-8 m-b-8" />
      <Box className="d-flex justify-content-between align-items-center m-t-4 m-b-4">
        <Avatar alt="" src="" style={{ width: '28px', height: '28px', marginRight: '8px' }} />
        <Box className="flex-1">
          <Skeleton variant="text" width="50%" />
        </Box>
        {mode === 'unrated' ? (
          <Button variant="contained" color="primary" size="small" disabled={true} style={{ minWidth: 136 }} />
        ) : (
          <Rating readOnly value={0} size="small" />
        )}
      </Box>
      {mode === 'rated' && (
        <Button fullWidth variant="contained" color="primary" size="small" className={'m-t-8'} disabled={true} />
      )}
    </CardDiv>
  );
};

export default RatingCardSkeleton;
