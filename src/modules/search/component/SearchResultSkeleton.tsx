import { Avatar, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { CardDiv } from '../../common/component/elements';

interface Props {}

const SearchResultSkeleton = (props: Props) => {
  return (
    <CardDiv style={{ display: 'flex', marginTop: 0, marginBottom: 12 }}>
      <div>
        <Skeleton variant="circle">
          <Avatar alt="" style={{ width: '40px', height: '40px' }} />
        </Skeleton>
      </div>
      <div style={{ paddingLeft: '12px' }}>
        <Typography variant="body2">
          <Skeleton width={100} />
        </Typography>

        <Typography variant="body2">
          <Skeleton width={150} />
        </Typography>

        <Typography variant="body2">
          <Skeleton width={200} />
        </Typography>
      </div>
    </CardDiv>
  );
};

export default SearchResultSkeleton;
