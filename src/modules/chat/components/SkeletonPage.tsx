import { Box, IconButton } from '@material-ui/core';
import ImageIcon from '@material-ui/icons/Image';
import SendRoundedIcon from '@material-ui/icons/SendRounded';
import { Skeleton } from '@material-ui/lab';
import React from 'react';
import { useIntl } from 'react-intl';
import { some } from '../../common/constants';
import ChatHeader from '../lib/header/ChatHeader';
import { AnchorDiv, TextInput } from './element';

interface Props {
  request: some;
}
export const ListSkeleton = () => {
  return (
    <div style={{ flex: 1, padding: 12 }} key={'listSkeleton'}>
      {Array(10)
        .fill(0)
        .map((val: number, index) => {
          return (
            <Box
              key={index}
              style={{
                padding: '6px 16px',
                display: 'flex',
                flexDirection: index % 2 === 0 || index % 3 === 0 ? 'row' : 'row-reverse',
              }}
            >
              <Skeleton
                style={{ height: 36, borderRadius: 18, transform: 'unset' }}
                width={`${index % 3 === 1 ? 60 : index % 3 === 0 ? 50 : index % 2 === 0 ? 30 : 40}%`}
              />
            </Box>
          );
        })}
    </div>
  );
};
const SkeletonPage = (props: Props) => {
  const { request } = props;
  const intl = useIntl();
  return (
    <Box style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <AnchorDiv>
        <ChatHeader request={request} isSkeleton />
      </AnchorDiv>
      <ListSkeleton />
      <AnchorDiv
        style={{ bottom: 0, paddingBottom: 4, paddingTop: 4, justifyContent: 'flex-end', background: 'white' }}
      >
        <Box display="flex" alignItems="center">
          <IconButton component="label">
            <ImageIcon color="primary" />
          </IconButton>
          <TextInput
            placeholder={intl.formatMessage({ id: 'chat.sendPlaceholder' })}
            fullWidth
            variant="outlined"
            disabled
            multiline
          />
          <IconButton disabled>
            <SendRoundedIcon color="primary" />
          </IconButton>
        </Box>
      </AnchorDiv>
    </Box>
  );
};

export default SkeletonPage;
